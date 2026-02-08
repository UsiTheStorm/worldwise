import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const deployTarget = env.VITE_DEPLOY_TARGET ?? 'DEV';
  const isGitHub = deployTarget === 'GH';

  return {
    base: isGitHub ? '/worldwise/' : '/',
    build: {
      emptyOutDir: true,
      sourcemap: true,
    },
    plugins: [react()],
  };
});
