import Pyroscope from "@pyroscope/nodejs";

interface PyroscopeOptions {
  appName: string;
  serverAddress: string;
  basicAuthUser: string;
  basicAuthPassword: string;
  tags: Record<string, string>;
  sourceMapPath: string[];
}

export function initializePyroscope({
  appName,
  serverAddress,
  basicAuthUser,
  basicAuthPassword,
  tags,
  sourceMapPath,
}: PyroscopeOptions) {
  Pyroscope.init({
    appName,
    serverAddress,
    basicAuthUser,
    basicAuthPassword,
    tags,
    sourceMapPath,
  });

  Pyroscope.startHeapProfiling();
  Pyroscope.startCpuProfiling();

  Pyroscope.start();
}
