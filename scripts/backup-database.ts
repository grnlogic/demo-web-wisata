import { exec } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const execAsync = promisify(exec);

async function backupDatabase() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const backupDir = join(process.cwd(), 'backups');
  
  // Create backups directory if it doesn't exist
  if (!existsSync(backupDir)) {
    mkdirSync(backupDir, { recursive: true });
  }

  const backupFile = join(backupDir, `backup_${timestamp}.sql`);
  
  // Database credentials from .env
  const dbUrl = process.env.DATABASE_URL || '';
  const match = dbUrl.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/([^?]+)/);
  
  if (!match) {
    console.error('❌ Invalid DATABASE_URL format');
    process.exit(1);
  }

  const [, user, password, host, port, database] = match;

  console.log('🔄 Starting database backup...');
  console.log(`📦 Database: ${database}`);
  console.log(`💾 Backup file: ${backupFile}`);

  try {
    // Set PGPASSWORD environment variable to avoid password prompt
    const command = `pg_dump -U ${user} -h ${host} -p ${port} ${database} > "${backupFile}"`;
    
    await execAsync(command, {
      env: { ...process.env, PGPASSWORD: password }
    });

    console.log('✅ Backup completed successfully!');
    console.log(`📁 Backup saved to: ${backupFile}`);
  } catch (error: any) {
    console.error('❌ Backup failed:', error.message);
    process.exit(1);
  }
}

backupDatabase();
