Title: Run a Kaspa Node - Kaspa Developer Platform

URL Source: http://docs.kas.fyi/guides/new-to-kaspa/run-a-kaspa-node

Markdown Content:
Running a Kaspa node allows you to participate directly in the Kaspa network. By running a node, you help validate transactions and maintain the security of the blockchain. This guide will walk you through the process step-by-step, regardless of your technical experience.

System Requirements
-------------------

These requirements align with the [Crescendo guide](https://github.com/kaspanet/rusty-kaspa/blob/v1.0.0/docs/crescendo-guide.md).

### Minimum

*   **CPU**: 8 CPU cores
*   **Memory**: 16 GB RAM
*   **Storage**: 256 GB SSD
*   **Network**: 5 MB/s (≈ 40 Mbit/s) bandwidth

### Preferred for higher performance (preferred for public node)

*   **CPU**: 12–16 CPU cores
*   **Memory**: 32 GB RAM
*   **Storage**: 512 GB SSD
*   **Network**: Higher bandwidth for robust peer support

What is Docker?
---------------

Docker is a tool that packages software into “containers” - think of it like a self-contained box that has everything the software needs to run. This makes it easy to run complex applications without worrying about installation conflicts or dependencies.

* * *

Step 1: Install Docker Desktop
------------------------------

First, we need to install Docker Desktop on your computer.

*   Windows

*   macOS

*   Linux

### Windows Installation

**Requirements:**

*   Windows 10 64-bit (Pro, Enterprise, or Education) or Windows 11
*   At least 16 GB of RAM

**Installation Steps:**

1.   **Download Docker Desktop**
    *   Visit [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
    *   Click the “Download for Windows” button
    *   Save the installer file to your computer

2.   **Run the Installer**
    *   Double-click the downloaded `Docker Desktop Installer.exe` file
    *   If prompted by Windows User Account Control, click “Yes” to allow the installer to run
    *   Follow the installation wizard - the default settings work well for most users

3.   **Restart Your Computer**
    *   After installation completes, restart your computer when prompted

4.   **Start Docker Desktop**
    *   After restarting, Docker Desktop should start automatically
    *   Look for the Docker icon (a whale) in your system tray (bottom-right corner of your screen)
    *   If it doesn’t start automatically, search for “Docker Desktop” in your Start menu and open it

5.   **Verify Installation**
    *   Open Command Prompt (search for “cmd” in the Start menu)
    *   Type this command and press Enter: ```
docker --version
``` 
    *   You should see something like `Docker version 24.0.0, build xyz`

### macOS Installation

**Requirements:**

*   macOS 11 (Big Sur) or newer
*   At least 16 GB of RAM

**Installation Steps:**

1.   **Download Docker Desktop**
    *   Visit [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
    *   Click “Download for Mac”
    *   Choose the version for your Mac: 
        *   **Apple Silicon (M1/M2/M3)**: Download “Mac with Apple chip”
        *   **Intel Mac**: Download “Mac with Intel chip”

2.   **Install Docker Desktop**
    *   Open the downloaded `Docker.dmg` file
    *   Drag the Docker icon to your Applications folder
    *   Open your Applications folder and double-click Docker

3.   **Grant Permissions**
    *   macOS may ask for permission to install additional components
    *   Enter your password when prompted
    *   Click “OK” to allow Docker to access your system

4.   **Start Docker Desktop**
    *   Docker Desktop should now be running
    *   Look for the Docker icon (a whale) in your menu bar at the top of your screen

5.   **Verify Installation**
    *   Open Terminal (you can find it in Applications > Utilities, or search for it using Spotlight)
    *   Type this command and press Enter: ```
docker --version
``` 
    *   You should see something like `Docker version 24.0.0, build xyz`

### Linux Installation (Ubuntu/Debian)

**Requirements:**

*   Ubuntu 20.04 or newer (or equivalent Debian-based distribution)
*   At least 16 GB of RAM

**Installation Steps:**

1.   **Update Your System**
    *   Open Terminal (Ctrl+Alt+T)
    *   Run these commands: ```
sudo apt-get update
sudo apt-get upgrade -y
``` 

2.   **Install Docker**
    *   Run these commands one by one: ```
sudo apt install docker.io
   sudo systemctl enable docker
``` 

3.   **Verify Installation**
    *   After logging back in, open Terminal and type: ```
docker --version
``` 
    *   You should see something like `Docker version 24.0.0, build xyz`

* * *

Step 2: Download the Kaspa Node Image
-------------------------------------

Now that Docker is installed, we need to download the official Kaspa node software.

*   Windows

*   macOS

*   Linux

1.   Open Command Prompt (search for “cmd” in the Start menu)
2.   Type this command and press Enter: ```
docker pull kaspanet/rusty-kaspad:latest
``` 
3.   Wait for the download to complete - this may take a few minutes depending on your internet speed
4.   You’ll see progress bars showing the download status

1.   Open Terminal (Applications > Utilities > Terminal, or search for it using Spotlight)
2.   Type this command and press Enter: ```
docker pull kaspanet/rusty-kaspad:latest
``` 
3.   Wait for the download to complete - this may take a few minutes depending on your internet speed
4.   You’ll see progress bars showing the download status

1.   Open Terminal (Ctrl+Alt+T)
2.   Type this command and press Enter: ```
docker pull kaspanet/rusty-kaspad:latest
``` 
3.   Wait for the download to complete - this may take a few minutes depending on your internet speed
4.   You’ll see progress bars showing the download status

* * *

Step 3: Create a Data Directory
-------------------------------

Your Kaspa node needs a place to store blockchain data. Let’s create a dedicated folder for this.

*   Windows

*   macOS

*   Linux

1.   Open File Explorer
2.   Navigate to your C: drive (or wherever you have plenty of space)
3.   Create a new folder called `kaspa-data`
4.   Note the full path - it should be something like `C:\kaspa-data`

Alternatively, using Command Prompt:

```
mkdir C:\kaspa-data
```

1.   Open Terminal
2.   Create a folder in your home directory: ```
mkdir -p ~/kaspa-data
``` 
3.   This creates a folder at `/Users/YourUsername/kaspa-data`

1.   Open Terminal
2.   Create a folder in your home directory: ```
mkdir -p ~/kaspa-data
``` 
3.   Set the correct permissions for the folder: ```
sudo chown 50051:50051 -R ~/kaspa-data
``` 
    *   This command changes the folder’s owner to user ID 50051, which is the user that runs inside the Docker container
    *   Enter your password when prompted

4.   This creates a folder at `/home/YourUsername/kaspa-data`

* * *

Step 4: Start Your Kaspa Node
-----------------------------

Now we’re ready to start the Kaspa node! This is where the magic happens.

*   Windows

*   macOS

*   Linux

In Command Prompt, run this command (replace `C:\kaspa-data` with your actual path if different):

```
docker run -d --name kaspa-node --restart unless-stopped -v C:\kaspa-data:/app/data -p 16110:16110 -p 16111:16111 -p 17110:17110 -p 18110:18110 kaspanet/rusty-kaspad:latest
```

**What this command does:**

*   `docker run`: Starts a new container
*   `-d`: Runs it in the background (detached mode)
*   `--name kaspa-node`: Names the container “kaspa-node” so you can easily reference it
*   `--restart unless-stopped`: Automatically restarts the node if it crashes or your computer reboots
*   `-v C:\kaspa-data:/app/data`: Connects your `kaspa-data` folder to the container
*   `-p 16110:16110 -p 16111:16111 -p 17110:17110 -p 18110:18110`: Opens ports (see [Understanding the Ports](http://docs.kas.fyi/guides/new-to-kaspa/run-a-kaspa-node#understanding-the-ports))
*   `kaspanet/rusty-kaspad:latest`: Uses the latest version of the Kaspa node software

In Terminal, run this command:

```
docker run -d --name kaspa-node --restart unless-stopped -v ~/kaspa-data:/app/data -p 16110:16110 -p 16111:16111 -p 17110:17110 -p 18110:18110 kaspanet/rusty-kaspad:latest
```

**What this command does:**

*   `docker run`: Starts a new container
*   `-d`: Runs it in the background (detached mode)
*   `--name kaspa-node`: Names the container “kaspa-node” so you can easily reference it
*   `--restart unless-stopped`: Automatically restarts the node if it crashes or your computer reboots
*   `-v ~/kaspa-data:/app/data`: Connects your `kaspa-data` folder to the container
*   `-p 16110:16110 -p 16111:16111 -p 17110:17110 -p 18110:18110`: Opens ports (see [Understanding the Ports](http://docs.kas.fyi/guides/new-to-kaspa/run-a-kaspa-node#understanding-the-ports))
*   `kaspanet/rusty-kaspad:latest`: Uses the latest version of the Kaspa node software

In Terminal, run this command:

```
docker run -d --name kaspa-node --restart unless-stopped -v ~/kaspa-data:/app/data -p 16110:16110 -p 16111:16111 -p 17110:17110 -p 18110:18110 kaspanet/rusty-kaspad:latest
```

**What this command does:**

*   `docker run`: Starts a new container
*   `-d`: Runs it in the background (detached mode)
*   `--name kaspa-node`: Names the container “kaspa-node” so you can easily reference it
*   `--restart unless-stopped`: Automatically restarts the node if it crashes or your computer reboots
*   `-v ~/kaspa-data:/app/data`: Connects your `kaspa-data` folder to the container
*   `-p 16110:16110 -p 16111:16111 -p 17110:17110 -p 18110:18110`: Opens ports (see [Understanding the Ports](http://docs.kas.fyi/guides/new-to-kaspa/run-a-kaspa-node#understanding-the-ports))
*   `kaspanet/rusty-kaspad:latest`: Uses the latest version of the Kaspa node software

* * *

Step 5: Monitor Your Node
-------------------------

Your node is now running, but it needs time to synchronize with the Kaspa network. Let’s check on its progress.

*   Docker Desktop

*   Terminal Commands

### Using Docker Desktop (Recommended for Beginners)

If you’re using Docker Desktop on Windows or macOS, you can monitor your node using the graphical interface:

1.   **Open Docker Desktop**
    *   Click the Docker icon in your system tray (Windows) or menu bar (macOS)
    *   Select “Dashboard” or just open the Docker Desktop application

2.   **Find Your Node**
    *   You’ll see a list of running containers
    *   Look for the container named `kaspa-node`
    *   It should show a green “Running” status

3.   **View Logs**
    *   Click the `kaspa-node` container
    *   Open the “Logs” tab to see real-time output (auto-updates)

4.   **Check Resource Usage**
    *   See CPU, memory, and network usage in container details

5.   **Container Actions**
    *   From Docker Desktop, you can easily: 
        *   **Stop** the container (Stop button)
        *   **Start** it again (Start button)
        *   **Restart** it (Restart button)
        *   **Delete** it (Delete button - be careful!)

### Using Terminal Commands

If you prefer using terminal commands or are on Linux:

#### View Node Logs

```
docker logs -f kaspa-node
```

**What you’ll see:**

*   Lines starting with `[INF]` are informational messages
*   Lines starting with `[WRN]` are warnings (usually not a problem)
*   You should see messages about accepting blocks as your node syncs

**To stop viewing logs:** Press `Ctrl + C`

#### Check if Your Node is Running

```
docker ps
```

Shows running containers. You should see `kaspa-node` in the list.

### Understanding Synchronization

When you first start your node, it needs to download and verify the existing data on the Kaspa blockchain. This process is called “synchronization” or “syncing.”

*   **Initial sync time**: Several hours to a day, depending on your internet speed and computer performance
*   **What’s happening**: Your node is downloading blocks and verifying transactions
*   **Normal behavior**: High CPU and network usage during initial sync

* * *

Step 6: Make Your Node Public (Optional)
----------------------------------------

The heart of Kaspa is its network of public nodes. By making your node public, you’re contributing directly to the decentralization and resilience of the Kaspa network.

### What Does “Public” Mean?

A public node allows other nodes in the Kaspa network to connect to it for peer-to-peer communication. This helps:

*   **Strengthen the network**: More public nodes mean better network connectivity
*   **Support new nodes**: Help other nodes sync faster
*   **Increase decentralization**: Distribute network load across more participants

### Requirements for a Public Node

*   **Stable internet connection**: Your node should be online consistently
*   **Sufficient bandwidth**: You’ll be sharing data with other nodes
*   **Port forwarding**: Port 16111 (P2P) needs to be accessible from the internet

### Opening the P2P Port

If your computer is on a private network behind a router that supports UPnP (Universal Plug and Play), you can easily open the P2P port (16111) using this command:

*   Linux/macOS

*   Windows

*   Manual Router Configuration

```
sudo docker run --rm --network=host alpine sh -c 'apk add miniupnpc; upnpc -r 16111 tcp'
```

**What this command does:**

*   Uses a temporary Alpine Linux container to run UPnP commands
*   Installs `miniupnpc` (a UPnP client)
*   Requests your router to forward port 16111 (TCP) to your computer
*   The container removes itself after completing the task (`--rm` flag)

```
docker run --rm --network=host alpine sh -c "apk add miniupnpc; upnpc -r 16111 tcp"
```

**What this command does:**

*   Uses a temporary Alpine Linux container to run UPnP commands
*   Installs `miniupnpc` (a UPnP client)
*   Requests your router to forward port 16111 (TCP) to your computer
*   The container removes itself after completing the task (`--rm` flag)

#### Manual Router Configuration

If the automatic method doesn’t work or your router doesn’t support UPnP:

1.   **Find your local IP address:**
    *   **Windows**: Open Command Prompt and type `ipconfig`
    *   **macOS/Linux**: Open Terminal and type `ifconfig` or `ip addr`
    *   Look for your IPv4 address (usually starts with 192.168.x.x or 10.0.x.x)

2.   **Access your router settings:**
    *   Open a web browser
    *   Go to your router’s IP address (commonly `192.168.1.1` or `192.168.0.1`)
    *   Log in with your router credentials

3.   **Set up port forwarding:**
    *   Find the “Port Forwarding” or “Virtual Server” section
    *   Add a new port forwarding rule: 
        *   **Service Name**: Kaspa Node
        *   **External Port**: 16111
        *   **Internal Port**: 16111
        *   **Internal IP**: Your computer’s local IP address
        *   **Protocol**: TCP

    *   Save the settings

4.   **Verify the port is open:**
    *   Visit a port checking website like [https://www.yougetsignal.com/tools/open-ports/](https://www.yougetsignal.com/tools/open-ports/)
    *   Enter port 16111 and check if it’s accessible

### Verifying Your Public Node

After opening the port, you can verify your node is publicly accessible:

1.   **Check your public IP:**
    *   Visit [https://www.whatismyip.com/](https://www.whatismyip.com/)
    *   Note your public IP address

2.   **Test the port:**
    *   Use an online port checker to verify port 16111 is open
    *   Wait a few minutes after configuration for changes to take effect

3.   **Monitor connections:**
    *   Check your node logs for incoming peer connections
    *   You should see messages about peers connecting to your node

### Considerations

*   **Firewall**: Make sure your computer’s firewall allows incoming connections on port 16111
*   **Dynamic IP**: If your ISP assigns you a dynamic IP address, your public IP may change periodically
*   **Security**: Opening a port is generally safe, but make sure only port 16111 is exposed
*   **Bandwidth**: Public nodes may use more bandwidth as other nodes connect to sync data

* * *

Step 7: Managing Your Node
--------------------------

*   Docker Desktop

*   Terminal Commands

### Using Docker Desktop

#### Stop Your Node

1.   Open Docker Desktop
2.   Find the `kaspa-node` container in the list
3.   Click the **Stop** button (square icon)
4.   The container status will change to “Exited”

#### Start Your Node (After Stopping)

1.   Open Docker Desktop
2.   Find the `kaspa-node` container in the list
3.   Click the **Start** button (play icon)
4.   The container status will change to “Running”

#### Restart Your Node

1.   Open Docker Desktop
2.   Find the `kaspa-node` container in the list
3.   Click the **Restart** button (circular arrow icon)
4.   The node will stop and start again

#### Remove Your Node

If you want to completely remove the node container (but keep your blockchain data):

1.   Open Docker Desktop
2.   Find the `kaspa-node` container in the list
3.   **Stop** the container first (if it’s running)
4.   Click the **Delete** button (trash icon)
5.   Confirm the deletion

To start fresh, you would then need to run the `docker run` command from Step 4 again.

#### Update Your Node

When a new version of the Kaspa node is released:

1.   **Stop and remove the current node:**
    *   Open Docker Desktop
    *   Stop the `kaspa-node` container
    *   Delete the `kaspa-node` container

2.   **Download the latest image:**
    *   Go to the “Images” section in Docker Desktop
    *   Search for `kaspanet/rusty-kaspad`
    *   Click the pull/download icon to get the latest version Or use terminal:

```
docker pull kaspanet/rusty-kaspad:latest
```

3.   **Start the node again** using the `docker run` command from Step 4

Your blockchain data will be preserved in the `kaspa-data` folder!

### Using Terminal Commands

#### Stop Your Node

```
docker stop kaspa-node
```

#### Start Your Node (After Stopping)

```
docker start kaspa-node
```

#### Restart Your Node

```
docker restart kaspa-node
```

#### Remove Your Node

If you want to completely remove the node container (but keep your blockchain data):

```
docker stop kaspa-node
docker rm kaspa-node
```

To start fresh, you would then need to run the `docker run` command from Step 4 again.

#### Update Your Node

When a new version of the Kaspa node is released:

1.   **Stop the current node:**```
docker stop kaspa-node
docker rm kaspa-node
``` 
2.   **Download the latest image:**```
docker pull kaspanet/rusty-kaspad:latest
``` 
3.   **Start the node again** using the `docker run` command from Step 4

Your blockchain data will be preserved in the `kaspa-data` folder!

* * *

Troubleshooting
---------------

* * *

Understanding the Ports
-----------------------

Your Kaspa node uses four network ports:

*   **Port 16110 (gRPC)**: The main RPC port for gRPC communication. This is the primary way applications interact with your node.
*   **Port 16111 (P2P)**: Used for peer-to-peer communication with other Kaspa nodes on the network.
*   **Port 17110 (Borsh RPC)**: Used for Borsh-encoded RPC communication. This is a binary serialization format used by some applications.
*   **Port 18110 (JSON RPC)**: Used for JSON-encoded RPC communication. This is useful for applications that prefer JSON over gRPC.

* * *

Next Steps
----------

Now that your Kaspa node is running, you can:

*   **Support the network**: By running a node, you’re helping secure and decentralize Kaspa
*   **Make it public**: Follow the section above to open your node to the network
*   **Monitor performance**: Watch the logs to see your node processing transactions in real-time
*   **Learn more**: Check out the [Kaspa Wiki](https://wiki.kaspa.org/en/node) for advanced configuration options

* * *

Additional Resources
--------------------

*   **Official Kaspa Node Image**: [https://hub.docker.com/r/kaspanet/rusty-kaspad](https://hub.docker.com/r/kaspanet/rusty-kaspad)
*   **Kaspa Wiki - Node Documentation**: [https://wiki.kaspa.org/en/node](https://wiki.kaspa.org/en/node)
*   **Kaspa Discord**: Join the community for support and discussions

[Need Help? ---------- Join the Kaspa Discord community for live support and to connect with other node operators.](https://discord.gg/kaspa)

* * *

Congratulations! 🎉
-------------------

You’re now running your own Kaspa node! This is an important contribution to the Kaspa network’s decentralization and security. Thank you for participating in the network!
