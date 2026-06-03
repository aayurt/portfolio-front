const DB_NAME = 'portfolio-cache';
const DB_VERSION = 3;
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000;
const MAX_ENTRIES = 500;

function openDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (db.objectStoreNames.contains('responses')) {
                db.deleteObjectStore('responses');
            }
            const store = db.createObjectStore('responses', { keyPath: 'url' });
            store.createIndex('timestamp', 'timestamp', { unique: false });
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

function dbPut(url, body, headers, status, statusText) {
    return openDB().then(db => new Promise((resolve, reject) => {
        const tx = db.transaction('responses', 'readwrite');
        tx.objectStore('responses').put({
            url, body, headers, status, statusText, timestamp: Date.now(),
        });
        tx.oncomplete = () => { db.close(); resolve(); };
        tx.onerror = () => { db.close(); reject(tx.error); };
    }));
}

function dbGet(url) {
    return openDB().then(db => new Promise((resolve) => {
        const tx = db.transaction('responses', 'readonly');
        const req = tx.objectStore('responses').get(url);
        req.onsuccess = () => { db.close(); resolve(req.result || null); };
        req.onerror = () => { db.close(); resolve(null); };
    }));
}

function dbDelete(url) {
    return openDB().then(db => new Promise((resolve, reject) => {
        const tx = db.transaction('responses', 'readwrite');
        tx.objectStore('responses').delete(url);
        tx.oncomplete = () => { db.close(); resolve(); };
        tx.onerror = () => { db.close(); reject(tx.error); };
    }));
}

function dbGetAll() {
    return openDB().then(db => new Promise((resolve, reject) => {
        const tx = db.transaction('responses', 'readonly');
        const req = tx.objectStore('responses').getAll();
        req.onsuccess = () => { db.close(); resolve(req.result); };
        req.onerror = () => { db.close(); reject(req.error); };
    }));
}

async function cleanOldCache() {
    try {
        const entries = await dbGetAll();
        entries.sort((a, b) => a.timestamp - b.timestamp);
        const now = Date.now();
        let deleted = 0;
        for (const entry of entries) {
            if (now - entry.timestamp > CACHE_TTL || entries.length - deleted > MAX_ENTRIES) {
                await dbDelete(entry.url);
                deleted++;
            }
        }
    } catch (e) {
        console.error('Cache cleanup failed:', e);
    }
}

function isApiRequest(path) {
    return path.startsWith('/admin/api/');
}

async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response.ok && isApiRequest(new URL(request.url).pathname)) {
            const body = await response.clone().text();
            const headers = [...response.headers.entries()];
            await dbPut(request.url, body, headers, response.status, response.statusText);
        }
        return response;
    } catch (e) {
        const cached = await dbGet(request.url);
        if (cached) {
            return new Response(cached.body, {
                status: cached.status,
                statusText: cached.statusText,
                headers: cached.headers,
            });
        }
        throw e;
    }
}

self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(clients.claim());
    e.waitUntil(cleanOldCache());
});

self.addEventListener('fetch', (e) => {
    const url = new URL(e.request.url);
    if (e.request.method !== 'GET') return;
    if (url.origin !== self.location.origin) return;
    if (!isApiRequest(url.pathname)) return;
    e.respondWith(networkFirst(e.request));
});

self.addEventListener('message', (e) => {
    if (e.data === 'skip-waiting') {
        self.skipWaiting();
    }
});
