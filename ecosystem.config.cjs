module.exports = {
  apps: [
    {
      name: 'portfolio',
      cwd: '/var/www/portfolio',
      script: '.next/standalone/server.js',
      // Fork mode: cluster mode crash-loops this app on the VPS (silent
      // restarts under memory pressure). The box has a single CPU, so there
      // is no scaling loss from using one fork.
      instances: 1,
      exec_mode: 'fork',

      // 🟢 SAFETY 1: Restart process if it exceeds a limit (e.g., 1GB)
      // This is a "hard reset" to clear memory leaks.
      max_memory_restart: '1G',

      // 🟢 SAFETY 2: Tell Node/V8 to be aggressive with garbage collection
      // --max-old-space-size: Sets the limit where Node starts GC heavily.
      // --gc-interval: Frequency of the garbage collector.
      // --env-file: load runtime secrets (ANALYTICS_TOKEN) from /var/www/portfolio/.env
      node_args: '--max-old-space-size=300 --env-file=.env',

      env: {
        NODE_ENV: 'production',
        PORT: 3002,
      },
    },
  ],
}
