# CRÓNICAS DEL UMBRAL — RPG 0.1

> **Título provisional**, 250 puntos de diseño como visión de producto. **Estado: prototipo vertical jugable**, no juego terminado.

RPG de acción y fantasía con escenarios 3D, personajes pixel art 2D, cámara superior inclinada y controles táctiles para iPhone. Construido con **Three.js**, JavaScript y CSS, sin backend ni registro de usuarios. Los sprites y el escenario se generan de forma original en el navegador; las 10 imágenes del creador se usaron como **referencias**, no como recursos listos para spritesheets.

## Qué podés jugar hoy

- Nueva partida: nombre, hombre/mujer, colores de piel/ojos/cabello/ropa, 10 peinados, escala corporal preliminar.
- **13 clases** seleccionables con atributos distintos y una habilidad especial por clase.
- Prólogo narrativo de tres escenas (no cinemática manga animada).
- Mundo continuo con aldea, casas 3D, comerciantes, diálogos, recolección, bosque, iluminación según reloj y minimapa.
- Slimes, lobos, conejos, goblins; lobos nocturnos de ojos rojos con 10× PV/ataque, conejos carmesí con 50× PV/ataque.
- Ataques, habilidad, esquiva, puntos de salud/maná/resistencia, experiencia, niveles, monedas y botín.
- Inventario, equipo, equipar/desequipar, tiendas, comprar, vender y objeto básico permanente no vendible.
- Misiones de la anciana Elara y progreso de investigación.
- **Laberinto de Signar: seis pisos**, gnomos mineros y jefe Signar en el sexto piso.
- Tres ranuras de guardado local, autoguardado, pantalla de derrota, pausa, configuraciones y mapa ampliado.
- Controles para móvil y PC. Instalable desde Safari como **app web de pantalla de inicio**.

## Cómo probar desde la computadora

Si querés probar inmediatamente sin instalar paquetes, abrí el proyecto en una carpeta y levantá un servidor local:

```bash
python3 -m http.server 8080
```

Visitá **http://localhost:8080**. Requiere internet la primera vez para importar Three.js del CDN si todavía no ejecutaste el build. No abras `index.html` con `file://`: los módulos y PWA necesitan servidor.

Para compilar una versión **con Three.js local**:

```bash
npm install
npm test
npm run build
cd www
python3 -m http.server 8080
```

La carpeta **www/** lista para publicar o usar con Capacitor incluye Three.js local y admite carga posterior sin internet cuando se instala y cachea correctamente.

## Publicación en GitHub Pages

1. Creá un repositorio nuevo en GitHub, por ejemplo `cronicas-del-umbral-rpg`.
2. Descomprimí este ZIP en tu equipo y subí **los archivos y carpetas internos**, no el ZIP comprimido. Confirmá que `index.html` y `.github/workflows/pages.yml` estén en la raíz.
3. Usá `main` como rama principal. Entrá en **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Desde **Actions**, verificá que el flujo “Publicar RPG en GitHub Pages” termine correctamente. Si aparece una solicitud para habilitar Actions, habilitala en tu propio repositorio.
5. La URL será aproximadamente `https://TU-USUARIO.github.io/cronicas-del-umbral-rpg/` (depende del nombre real del repositorio). **No está publicado automáticamente desde este ZIP**.

**Atajo:** GitHub Pages también admite desplegar los archivos estáticos desde la raíz de la rama, pero la configuración con Actions usa `www/`, aloja la copia de Three.js y es la ruta recomendada.

## Instalar como app en iPhone

1. Una vez publicada la URL `https://...github.io/...`, abrila en **Safari**.
2. Tocá **Compartir → Añadir a pantalla de inicio**.
3. Activá **Abrir como app web** si aparece esa opción y tocá Añadir.
4. Abrí el icono “Crónicas RPG” desde la pantalla de inicio. Usá el joystick virtual y los botones de acción.

Esto **no instala un IPA ni publica en App Store**. Es una PWA: una web instalada con aspecto de aplicación. El progreso se guarda en almacenamiento local del navegador/app de ese dispositivo; no se sincroniza con otros teléfonos.

## Convertir a app nativa iOS con Capacitor (fase posterior)

En una **Mac con Xcode** y Node.js:

```bash
npm install
npm install @capacitor/core @capacitor/cli @capacitor/ios
npm run build
npx cap add ios
npx cap sync ios
npx cap open ios
```

Luego hay que configurar el identificador definitivo del proyecto, firmar y probar desde Xcode. Para distribuir en App Store se necesitan los procesos y requisitos del programa de desarrolladores de Apple. **No se entrega un archivo IPA ni se publica en App Store en este prototipo.**

## Controles

**iPhone/táctil:** joystick a la izquierda para moverse; botones a la derecha para ataque, habilidad, esquiva e interacción. Barra inferior para bolsa, personaje, misiones, mapa y poción. El diseño admite vertical y horizontal; horizontal ofrece mejor campo visual.

**PC:** WASD o flechas = caminar · Shift = correr · Espacio/J = atacar · Q = habilidad · X = esquivar · E = interactuar · H = poción · I = bolsa · M = mapa · Esc = pausa.

## Sistemas no terminados (importante)

Esta versión no implementa todos los 250 puntos. No hay aún: ilustraciones manga animadas personalizadas; sprites de equipamiento completamente desmontables (casco/brazos/piernas) con deformación avanzada; interiores explorables de cada casa; física compleja y desniveles reales; multirregión/islas marítimas; árbol de talentos completo; mejores animaciones de combate por arma; laberintos procedurales con rutas únicas; patrones/fases complejos definitivos de Signar; NPC con horarios reales de movimiento; crafting completo; multijugador; sincronización entre dispositivos; cuentas online; soundtrack producida, ni distribución nativa a App Store. Algunos menús son funcionales de forma básica, no implementación final.

Las estadísticas numéricas, peinados dibujados, precios y efectos de habilidades son **valores temporales de prueba**. El nivel/color definitivo de Signar no se asignó; los laberintos negro/blanco/amarillo/rojo están documentados como futura ampliación. El desenlace narrativo tampoco es definitivo.

## Estructura

```text
index.html                 UI del juego y pantallas
src/main.js                Lógica, combate, guardados, controles, interfaz
src/world.js               Geometría 3D, aldea, bosque, Signar, spawns
src/art.js                 Generador de sprites/tiles pixel art originales
src/data.js                Clases, enemigos, objetos, comerciantes
src/style.css              Interfaz y diseño responsivo
manifest.webmanifest       Instalación PWA iOS
service-worker.js          Caché del juego y recursos
assets/icon-*.png          Iconos originales
scripts/build.mjs          Produce www/ y copia Three.js instalado
capacitor.config.json      Punto de partida para empaquetado iOS
.github/workflows/pages.yml  Publicación automática en Pages
tests/smoke.mjs            Pruebas de consistencia de datos
ROADMAP.md                 Alcance de v0.1 y siguientes fases
```

## Notas de diseño y rendimiento

Los suelos se agrupan mediante `InstancedMesh` para limitar llamadas de dibujo. Las texturas de baja resolución usan muestreo `NearestFilter` para preservar el pixel art. Calidad gráfica regulable; la vegetación se representa con sprites billboard en el mundo 3D. El mundo está fijado para mantener continuidad al cambiar de zona. Las tiendas no venden ni descartan ropa interior. El guardado usa `localStorage`; para un lanzamiento serio convendrá incorporar IndexedDB y pruebas de compatibilidad entre versiones.

**Autoría:** demo de referencia y código generado para continuar el desarrollo. Antes de publicar comercialmente, sustituir contenido provisional, ampliar pruebas y verificar licencias de todos los recursos añadidos en fases posteriores.
