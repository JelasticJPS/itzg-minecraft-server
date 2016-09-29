{
  "jpsVersion": 0.8,
  "jpsType": "install",
  "application": {
    "id": "minecraft-server",
    "name": "Minecraft Server",
    "description": "Minecraft server allows players to play online or via a local area network with other people.",
    "logo": "https://github.com/jelastic-jps/minecraft-server/raw/master/images/Minecraft.png",
    "homepage": "https://github.com/jelastic-jps/minecraft-server",
    "env": {
      "topology": {
        "nodes": [
          {
            "docker": {
              "image": "itzg/minecraft-server",
              "env": {
                "EULA": "TRUE"
              }
            },
            "cloudlets": 16,
            "nodeGroup": "cp",
            "displayName": "Minecraft"
          }
        ]
      }
    },
    "license": {
      "terms": {
        "en": "I agree with <a href='https://account.mojang.com/documents/minecraft_eula' target='_blank'><u>terms of service</u></a>"
      }
    },
    "onInstall": [
      {
        "call": [
          "updateConfiguration",
          "addEndpoint"
        ]
      },
      {
        "restartContainers": {
          "nodeGroup": "cp"
        }
      }
    ],
    "procedures": [
      {
        "id": "updateConfiguration",
        "onCall": {
          "executeShellCommands": {
            "commands": [
              "echo \"eula=true\" > /data/eula.txt",
              "sed  -i \"/usermod\\|groupmod/d\" /start",
              "wget https://github.com/jelastic-jps/minecraft-server/raw/master/properties/server.properties -O /data/server.properties"
            ],
            "nodeGroup": "cp"
          }
        }
      },
      {
        "id": "addEndpoint",
        "onCall": {
          "executeScript": {
            "type": "js",
            "script": "https://github.com/jelastic-jps/minecraft-server/raw/master/scripts/addEndpoint.js?1212",
            "params": {
              "nodeId": "${nodes.cp.first.id}",
              "port": 25565
            }
          }
        }
      }
    ]
  }
}
