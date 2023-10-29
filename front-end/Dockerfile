# Stage 1 - Build
FROM node:lts-alpine as react-build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY vite.config.ts ./
COPY tsconfig.node.json ./
COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY .eslintrc.cjs ./
COPY index.html ./
COPY ./public ./public
COPY ./src ./src 
RUN npm run build

# Stage 2 - Release
FROM nginx:stable-alpine
COPY --from=react-build /app/build /var/www/app/web
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD nginx -g "daemon off;"
