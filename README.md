# Skywalking.dev - One-Pager Website

Una moderna one-pager para Skywalking.dev, agencia especializada en automatización empresarial con IA. Diseño futurista con tema oscuro, gradientes y efectos glassmorphism inspirado en Lambda Automations.

## 🚀 Características

### Diseño y UI
- **Tema oscuro futurista** con gradientes azules y efectos de cristal
- **Glassmorphism** con backdrop blur y transparencias
- **Responsive design** optimizado para móvil, tablet y desktop
- **Accesibilidad WCAG 2.1 AA** con navegación por teclado
- **Performance optimizado** con lazy loading y throttling

### Funcionalidades
- **Navegación suave** con scroll animations
- **Formulario de contacto** con validación en tiempo real
- **Efectos parallax** en elementos de fondo
- **Animaciones tipo typewriter** en texto hero
- **Contadores animados** en métricas
- **Menu móvil responsive** con hamburger animation

### Secciones
1. **Hero** - "Tu Mentat Digital para Automatización con IA"
2. **Value Prop** - 3 pilares de arquitectura
3. **Servicios** - Agentes conversacionales, automatización, transformación
4. **Stack Tecnológico** - Herramientas y tecnologías
5. **Proceso** - 4 fases de implementación
6. **Casos de Éxito** - Testimonios LATAM
7. **Contacto** - Formulario con Gonza

## 🛠️ Stack Tecnológico

- **HTML5** - Estructura semántica y accesible
- **CSS3** - Variables CSS, Grid, Flexbox, Backdrop Filter
- **Vanilla JavaScript** - ES6+ con clases y módulos
- **Google Fonts** - Inter como tipografía principal
- **GitHub Pages** - Hosting estático gratuito

## 📁 Estructura del Proyecto

```
skywalking_website/
├── index.html          # Página principal
├── styles.css          # Estilos CSS con tema oscuro
├── script.js           # JavaScript con interacciones
└── README.md          # Este archivo
```

## 🚀 Deployment en GitHub Pages

### Opción 1: Deployment Directo (Recomendado)

1. **Crear repositorio en GitHub**
   ```bash
   # Crear nuevo repositorio público
   # Nombre sugerido: skywalking-website
   ```

2. **Subir archivos**
   ```bash
   cd skywalking_website
   git init
   git add .
   git commit -m "feat: initial skywalking.dev one-pager"
   git branch -M main
   git remote add origin https://github.com/[username]/skywalking-website.git
   git push -u origin main
   ```

3. **Activar GitHub Pages**
   - Ir a Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "main"
   - Folder: "/ (root)"
   - Save

4. **Acceder al sitio**
   - URL: `https://[username].github.io/skywalking-website/`
   - El sitio estará disponible en 5-10 minutos

### Opción 2: Custom Domain

Si tienes un dominio personalizado:

1. **Configurar DNS**
   ```
   Type: CNAME
   Name: www
   Value: [username].github.io

   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```

2. **Configurar en GitHub**
   - Settings → Pages → Custom domain
   - Agregar: `www.skywalking.dev`
   - ✅ Enforce HTTPS

3. **Crear archivo CNAME**
   ```bash
   echo "www.skywalking.dev" > CNAME
   git add CNAME
   git commit -m "feat: add custom domain"
   git push
   ```

### Opción 3: GitHub Actions (Avanzado)

Para deployment automatizado con optimizaciones:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: Optimize images
      run: |
        # Agregar optimización de imágenes si las hay
        echo "Optimizing assets..."

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## 🔧 Desarrollo Local

### Servidor Local Simple
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

### Live Server (Recomendado)
```bash
# VS Code Extension: Live Server
# O usar live-server npm package
npm install -g live-server
live-server
```

## 🎨 Personalización

### Colores y Tema
```css
:root {
  /* Cambiar colores principales */
  --bg-primary: #000a15;
  --accent-primary: #00d9ff;
  --accent-secondary: #7c3aed;

  /* Personalizar gradientes */
  --gradient-primary: linear-gradient(135deg, var(--blue-600), var(--accent-primary));
}
```

### Contenido
- Editar textos en `index.html`
- Actualizar casos de éxito con datos reales
- Modificar stack tecnológico según evolución
- Personalizar métricas y estadísticas

### Formulario de Contacto
```javascript
// En script.js, método submitForm()
// Reemplazar simulación con API real
const response = await fetch('https://api.skywalking.dev/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

## 📊 Performance

### Métricas Target
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Optimizaciones Implementadas
- ✅ Lazy loading de elementos no críticos
- ✅ Throttling en scroll events
- ✅ Debouncing en resize events
- ✅ Font preloading (Google Fonts)
- ✅ Minified CSS variables
- ✅ Optimized animations with `will-change`

## 🔍 SEO

### Meta Tags Incluidos
```html
<meta name="description" content="Agencia especializada en automatización empresarial con IA">
<meta property="og:title" content="Skywalking.dev - Tu Mentat Digital">
<meta property="og:description" content="Automatización con IA para empresas LATAM">
<meta name="keywords" content="automatización, IA, n8n, Claude API, WhatsApp API">
```

### Mejoras Adicionales
- Agregar sitemap.xml
- Implementar schema.org structured data
- Optimizar imágenes con WebP
- Configurar robots.txt

## 🛡️ Seguridad

### Headers de Seguridad
```yaml
# _headers file para Netlify/Vercel
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com;
```

## 📱 PWA (Opcional)

Para convertir en Progressive Web App:

```javascript
// service-worker.js
const CACHE_NAME = 'skywalking-v1';
const urlsToCache = ['/', '/styles.css', '/script.js'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

```json
// manifest.json
{
  "name": "Skywalking.dev",
  "short_name": "Skywalking",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000a15",
  "theme_color": "#00d9ff",
  "icons": [
    {
      "src": "icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

## 🐛 Debugging

### Herramientas Útiles
```javascript
// Performance monitoring (ya incluido)
console.log('Page load time:', loadTime);

// Lighthouse CI
npm install -g @lhci/cli
lhci autorun

// Core Web Vitals
// Usar Chrome DevTools → Performance
```

### Issues Comunes
- **Fonts no cargan**: Verificar CORS en Google Fonts
- **Animaciones lentas**: Reducir complejidad en mobile
- **Form no funciona**: Verificar preventDefault() en submit
- **CSS no aplicado**: Verificar path relativo en GitHub Pages

## 📞 Soporte

Para problemas técnicos o mejoras:

- 📧 **Email**: mentat@skywalking.dev
- 💬 **Issues**: Crear issue en GitHub
- 📖 **Docs**: Ver documentación en `/docs`

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

---

**Desarrollado con ❤️ por el equipo de Skywalking.dev**

*Tu Mentat Digital para Automatización con IA*