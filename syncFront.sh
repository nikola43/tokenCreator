#ª/bin/bash
#rm -rf ./dist && yarn build && rsync -a dist/TokenGenerator/ root@178.62.74.110:/var/www/midastool.io/
rm -rf ./dist && yarn build && rsync -a dist/TokenGenerator/ root@147.182.203.95:/var/www/app.midastool.io/