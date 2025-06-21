// Frontend-only server using Vite
import { spawn } from 'child_process';

console.log('Starting Weather Dashboard frontend...');

const viteProcess = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5000'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'development' }
});

viteProcess.on('error', (error) => {
  console.error('Failed to start Vite server:', error);
  process.exit(1);
});

viteProcess.on('exit', (code) => {
  console.log(`Vite server exited with code ${code}`);
  process.exit(code || 0);
});