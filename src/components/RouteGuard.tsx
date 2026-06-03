"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/resources";
import { Flex, Spinner, Button, Heading, Column, PasswordInput } from "@once-ui-system/core";
import NotFound from "@/app/not-found";

interface RouteGuardProps {
  children: React.ReactNode;
}

function isRouteEnabled(pathname: string | null): boolean {
  if (!pathname) return false;
  if (pathname in routes) {
    return routes[pathname as keyof typeof routes];
  }
  const dynamicRoutes = ["/blog", "/work"] as const;
  for (const route of dynamicRoutes) {
    if (pathname.startsWith(route) && routes[route]) {
      return true;
    }
  }
  return false;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const routeEnabled = useMemo(() => isRouteEnabled(pathname), [pathname]);
  const needsAuth = useMemo(
    () => !!(pathname && protectedRoutes[pathname as keyof typeof protectedRoutes]),
    [pathname]
  );

  if (!routeEnabled) {
    return <NotFound />;
  }

  if (needsAuth) {
    return <AuthGate password={password} setPassword={setPassword} error={error} setError={setError}>{children}</AuthGate>;
  }

  return <>{children}</>;
};

function AuthGate({
  password, setPassword, error, setError, children,
}: {
  password: string;
  setPassword: (v: string) => void;
  error: string | undefined;
  setError: (v: string | undefined) => void;
  children: React.ReactNode;
}) {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const checkAuth = useCallback(async () => {
    setChecking(true);
    try {
      const res = await fetch("/api/check-auth");
      if (res.ok) setAuthenticated(true);
    } catch {
      // not authenticated
    }
    setChecking(false);
  }, []);

  useEffect(() => { checkAuth(); }, [checkAuth]);

  if (checking) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  if (authenticated) {
    return <>{children}</>;
  }

  const handleSubmit = async () => {
    const res = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <Column paddingY="128" maxWidth={24} gap="24" center>
      <Heading align="center" wrap="balance">
        This page is password protected
      </Heading>
      <Column fillWidth gap="8" horizontal="center">
        <PasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          errorMessage={error}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </Column>
    </Column>
  );
}

export { RouteGuard };
