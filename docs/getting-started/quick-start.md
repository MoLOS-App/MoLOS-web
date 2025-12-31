# Quick Start

Get MoLOS up and running in just a few minutes thanks to Docker (or Podman, we offer equal opportunities for everyone).

Choose your preferred method below. Both options expose MoLOS on `http://localhost:4173` once running.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="compose" label="Docker Compose" default>
    For a complete setup with persistent data storage:

    Again, generate a secure secret for authentication:

    ```bash
    BETTER_AUTH_SECRET=$(openssl rand -base64 32)
    echo $BETTER_AUTH_SECRET
    ```

    Create a `docker-compose.yml` file with the following content:

    ```yaml
    services:
      molos:
        image: ghcr.io/eduardez/molos:latest
        ports:
          - '4173:4173'
        volumes:
          - ./molos_data:/data
        environment:
          - DATABASE_URL=file:/data/molos.db
          - BETTER_AUTH_SECRET=YOUR_SECRET_HERE_DONT_FORGET_THAT
    ```

    Then run:

    ```bash
    docker-compose up -d
    ```

    :::tip
    Replace `YOUR_SECRET_HERE_DONT_FORGET_THAT` with the output of `openssl rand -base64 32`
    :::
  </TabItem>

  <TabItem value="docker" label="Docker">
    For a quick, stateless run (data won't persist between restarts):

    First, generate a secure secret for authentication:

    ```bash
    BETTER_AUTH_SECRET=$(openssl rand -base64 32)
    echo $BETTER_AUTH_SECRET
    ```

    Then run MoLOS:

    ```bash
    docker run -p 4173:4173 -e BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET ghcr.io/eduardez/molos:latest
    ```

    :::note
    This basic setup is perfect for testing MoLOS. For persistent data, use Docker Compose (tab on the right ->).
    :::
  </TabItem>
</Tabs>

Once MoLOS is running, open your browser and navigate to `http://localhost:4173` to start feeling it.

:::info
For advanced deployment options, including production hardening and monitoring, see the [Self-Hosting guide](/docs/getting-started/).
:::
