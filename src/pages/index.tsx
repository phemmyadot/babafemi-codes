// Define the AppProps interface
interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 "></main>
  );
}
