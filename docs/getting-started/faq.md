---
title: "FAQ & Troubleshooting"
description: "Common questions and solutions for getting started with MoLOS"
sidebar_label: "FAQ & Troubleshooting"
---

# FAQ & Troubleshooting

:::info
Find quick answers to common questions about MoLOS setup, features, and troubleshooting.
:::

## Getting Started

| Question | Answer |
|----------|--------|
| **System requirements?** | Docker on Windows/macOS/Linux, or Node.js 18+ for local development. Works in any modern browser. |
| **Quickest setup?** | Use Docker: `docker run -p 4173:4173 ghcr.io/molos-app/molos:latest` then visit http://localhost:4173 |
| **Data safety?** | All data stays local. No telemetry or external access. Complete privacy and control. |

## Core Features

This table shows how to use MoLOS when you have a question in mind.

| Question | Module | Purpose |
|----------|--------|---------|
| I don't know what I have for today | Dashboard | See what's going on with your life |
| I have no money for pizza | Finance | Remember where you have spent your last 20 dollars |
| I can't remember what my vision board was for this year | Goals | You promised to yourself something, don't forget that |
| Why don't my muscles grow? | Health | See your last flat bench PR and your protein intake |
| What was that delicious meal I made yesterday? | Meals | Save and improve your recipes |
| I had something important to do today but I can't remember what it was... | Tasks | Remember important things to do |

## Data & Privacy

| Question | Answer |
|----------|--------|
| **Data storage?** | Local SQLite database. No cloud sync by default. |
| **Export data?** | Not yet, but in the next release. It will support JSON, Markdown, and CSV formats. |
| **Backup options?** | Automated database snapshots every nigth. |

## Common Issues

| Issue | Solution |
|-------|----------|
| **Port 4173 in use** | Change port: `docker run -p 4174:4173 ...` |
| **Database locked** | Ensure only one instance runs or change the mount volume. |
| **Slow performance** | Restart container, check resources. |
| **Container exits** | Check logs: `docker logs molos` or `docker logs <id>`. Common causes: port conflicts or permission issues. |

### Detailed Troubleshooting

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="docker" label="Docker Issues">
    **Container won't start**
    1. Check logs: `docker logs <container-id>`
    2. Verify port availability: `lsof -i :4173`
    3. Try different port: `docker run -p 4174:4173 ...`
    4. Remove and restart: `docker rm <id> && docker run -d -p 4173:4173 ghcr.io/molos-app/molos:latest`

    **Data not persisting**

    Use named volume for persistence:
    ```bash
    docker run -d \
      -p 4173:4173 \
      -v molos-data:/app/data \
      ghcr.io/molos-app/molos:latest
    ```

    **Network access blocked**
    1. Check container status: `docker ps | grep molos`
    2. Verify port mapping: `docker port <container-id>`
    3. Try host network (Linux): `docker run --network host ...`
    4. Check firewall: Allow port 4173 in system firewall settings
  </TabItem>
  <TabItem value="app" label="Application Issues">
    **Blank/white page**
    1. Clear browser cache (Ctrl+Shift+Delete)
    2. Try incognito/private mode
    3. Check browser console (F12 → Console) for errors
    4. Verify container logs: `docker logs -f <container-id>`

    **Data not saving**
    1. Check browser console for JavaScript errors
    2. Verify database permissions: `docker exec <id> ls -la /app/data/`
    3. Check disk space: `df -h /app/data` (ensure >1GB free)
    4. Test database: `docker exec <id> sqlite3 /app/data/molos.db "PRAGMA integrity_check;"`

    **Slow performance**
    1. Check resources: `docker stats <container-id>`
    2. Allocate more memory: `docker run -m 2g -cpus 1.5 ...`
    3. Archive old data in the application
    4. Close unnecessary browser tabs and extensions

  </TabItem>
  <TabItem value="database" label="Database Maintenance">
    **Health check**
    ```bash
    # Open database shell
    docker exec -it <container-id> sqlite3 /app/data/molos.db

    # Run integrity check
    PRAGMA integrity_check;

    # Check table count
    SELECT count(*) FROM sqlite_master WHERE type='table';

    # Exit
    .quit
    ```

    **Manual backup**
    ```bash
    # While running
    docker exec <container-id> cp /app/data/molos.db /app/data/molos.db.backup

    # Or while stopped
    cp /path/to/molos-data/molos.db /path/to/backup/molos.db.backup
    ```

    **Restore from backup**
    ```bash
    # Stop container
    docker stop <container-id>

    # Replace database file
    cp /path/to/backup/molos.db /path/to/molos-data/molos.db

    # Restart container
    docker start <container-id>
    ```
  </TabItem>
</Tabs>
