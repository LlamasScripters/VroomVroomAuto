VroomVroomAuto 🚗⚡️

🚀 Lancer la migration de la base de données SQL
Pour migrer la base de données SQL, utilisez la commande suivante :

docker compose exec express npx ts-node src/bin/migrate.ts

🔄 Dénormaliser les données SQL vers MongoDB
Une fois la migration effectuée, vous pouvez dénormaliser les données de SQL vers MongoDB :

docker compose exec express npx src/bin/runDataDenormalization.ts


