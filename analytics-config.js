/* =====================================================================
   Configuración de estadísticas (los tres códigos son públicos y se pueden
   ver en el código de cualquier web; NO son contraseñas).

   1) GA_MEASUREMENT_ID  → ID de medición de Google Analytics 4 (empieza con G-)
   2) GA_PROPERTY_ID     → ID numérico de la propiedad de Analytics (solo números)
   3) OAUTH_CLIENT_ID    → ID de cliente de Google Cloud para el panel /admin.html
                           (termina en .apps.googleusercontent.com)

   Mientras estén vacíos, la web no envía nada a Google y el panel muestra la
   guía de configuración.
   ===================================================================== */
window.MEL_CONFIG = {
  GA_MEASUREMENT_ID: '',
  GA_PROPERTY_ID: '',
  OAUTH_CLIENT_ID: ''
};
