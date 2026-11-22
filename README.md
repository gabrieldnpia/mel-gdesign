# mel.gdesign

Sitio web de **Melanie Baptista** (mel.gdesign), diseñadora gráfica y directora creativa. Diseña identidades con personaje: logo, mascota, packaging y dirección de arte.

**Ver en línea:** https://gabrieldnpia.github.io/mel-gdesign/

- Todo el sitio vive en `index.html` (HTML, CSS y JavaScript, sin dependencias ni compilación).
- El formulario «Trabajemos junt@s» envía las respuestas al Google Form de Mel.
- Las imágenes de los proyectos se cargan desde su [Pinterest](https://www.pinterest.com/melgdesign29/) y su [Behance](https://www.behance.net/melaniebaptist).
- Para editar textos o proyectos: cambia `index.html` y haz *push* a `main`. GitHub Pages publica los cambios en uno o dos minutos.

## Estadísticas y panel de administración

- `analytics.js` envía eventos a Google Analytics 4 (con aviso de cookies) y `admin.html` es el panel privado para verlos (entrada con Google, solo cuentas con acceso a Analytics).
- Los tres códigos van en `analytics-config.js`: `GA_MEASUREMENT_ID`, `GA_PROPERTY_ID` y `OAUTH_CLIENT_ID`. Son públicos; no son contraseñas. Mientras estén vacíos, la web no envía nada.
- Panel: https://gabrieldnpia.github.io/mel-gdesign/admin.html
