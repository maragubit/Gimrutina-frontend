import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function CookiesPolicy() {
  return (
    <Container>
    <main className="max-w-4xl mx-auto p-6 text-gray-800 dark:text-gray-100">
      <header>
        <h1 className="text-3xl font-bold mb-2">
          Política de Cookies de GimRutina
        </h1>
        <p className="text-sm opacity-80">
          <strong>Fecha de última actualización:</strong> 24/08/2025
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-2">¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en tu
          dispositivo (ordenador, móvil, tablet, etc.) cuando visitas un sitio
          web. Estas cookies permiten que el sitio web recuerde tus acciones y
          preferencias durante un período de tiempo, de modo que no tengas que
          volver a introducir tus preferencias cada vez que accedes al sitio.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-2">
          ¿Qué tipos de cookies utilizamos?
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Cookies esenciales:</strong> necesarias para que el sitio web
            funcione correctamente. Son imprescindibles para la navegación y no
            pueden desactivarse.
          </li>
          <li>
            <strong>Cookies de rendimiento:</strong> recopilan información sobre
            cómo los usuarios utilizan nuestro sitio web, como las páginas más
            visitadas o mensajes de error.
          </li>
          <li>
            <strong>Cookies de funcionalidad:</strong> permiten recordar tus
            preferencias y personalizar el contenido.
          </li>
          <li>
            <strong>Cookies de publicidad:</strong> muestran anuncios más
            relevantes basados en tu comportamiento de navegación.
          </li>
          <li>
            <strong>Cookies de terceros:</strong> en algunas páginas, terceros
            pueden colocar cookies para funcionalidades adicionales (redes
            sociales, video, análisis, etc.).
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-2">
          ¿Cómo puedes gestionar las cookies?
        </h2>
        <p>
          Tienes la opción de controlar y gestionar las cookies de acuerdo con
          tus preferencias:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Aceptar o rechazar cookies:</strong> al ingresar a nuestro
            sitio web, te pediremos que aceptes el uso de cookies.
          </li>
          <li>
            <strong>Gestionar las cookies en tu navegador:</strong> puedes
            configurar tu navegador para bloquear todas o algunas cookies.  
            <br />
            Enlaces útiles:
            <ul className="list-disc ml-6">
              <li>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                  Google Chrome
                </a>
              </li>
              <li>
                <a href="https://support.mozilla.org/es/kb/Borrar%20cookies" target="_blank" rel="noopener noreferrer">
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">
                  Safari
                </a>
              </li>
              <li>
                <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">
                  Microsoft Edge
                </a>
              </li>
            </ul>
          </li>
          <li>
            <strong>Eliminar cookies:</strong> puedes eliminarlas en cualquier
            momento desde la configuración de tu navegador.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-2">
          ¿Qué ocurre si desactivas las cookies?
        </h2>
        <p>
          Si desactivas o bloqueas las cookies, algunas funcionalidades pueden
          verse afectadas y puede que no puedas acceder a ciertas áreas del
          sitio. Sin embargo, podrás seguir navegando en la mayoría de las
          páginas.
        </p>
      </section>

      <section>
  <h2 className="text-2xl font-semibold mt-6 mb-2">
    Cookies utilizadas en gimrutina.netlify.app
  </h2>
  <table className="w-full border-collapse border mt-4 mx-auto">
    <thead>
      <tr className="bg-gray-200 dark:bg-gray-700">
        <th className="border px-4 py-2 text-left">Cookie</th>
        <th className="border px-4 py-2 text-left">Propósito</th>
        <th className="border px-4 py-2 text-left">Duración</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border px-4 py-2">_grecaptcha</td>
        <td className="border px-4 py-2">
          <a href="https://policies.google.com/privacy?hl=es" target="_blank" rel="noopener noreferrer">
            Google Captcha v3 (para evitar spam en formularios)
          </a>
        </td>
        <td className="border px-4 py-2">Sesión</td>
      </tr>
      <tr>
        <td className="border px-4 py-2">APISID</td>
        <td className="border px-4 py-2">
          Preferencias y datos de usuario de Google, personalización de anuncios
        </td>
        <td className="border px-4 py-2">2 años</td>
      </tr>
      <tr>
        <td className="border px-4 py-2">HSID</td>
        <td className="border px-4 py-2">
          Información cifrada para autenticación y prevención de fraudes
        </td>
        <td className="border px-4 py-2">2 años</td>
      </tr>
      <tr>
        <td className="border px-4 py-2">NID</td>
        <td className="border px-4 py-2">
          Publicidad personalizada y segmentación de anuncios
        </td>
        <td className="border px-4 py-2">6 meses</td>
      </tr>
      <tr>
        <td className="border px-4 py-2">SAPISID</td>
        <td className="border px-4 py-2">
          Creación de perfil de usuario y anuncios personalizados
        </td>
        <td className="border px-4 py-2">2 años</td>
      </tr>
      <tr>
        <td className="border px-4 py-2">SID</td>
        <td className="border px-4 py-2">
          Autenticación y seguridad de cuentas Google
        </td>
        <td className="border px-4 py-2">2 años</td>
      </tr>
      <tr>
        <td className="border px-4 py-2">SIDCC</td>
        <td className="border px-4 py-2">Protección frente a ataques y seguridad</td>
        <td className="border px-4 py-2">1 año</td>
      </tr>
      <tr>
        <td className="border px-4 py-2">SSID</td>
        <td className="border px-4 py-2">
          Información cifrada para autenticación y personalización
        </td>
        <td className="border px-4 py-2">2 años</td>
      </tr>
      <tr>
        <td className="border px-4 py-2">__Secure-1PAPISID</td>
        <td className="border px-4 py-2">Segmentación para anuncios relevantes</td>
        <td className="border px-4 py-2">2 años</td>
      </tr>
      <tr>
        <td className="border px-4 py-2">__Secure-1PSID</td>
        <td className="border px-4 py-2">Autenticación y seguridad de usuario</td>
        <td className="border px-4 py-2">2 años</td>
      </tr>
      <tr>
        <td className="border px-4 py-2">__Secure-1PSIDCC</td>
        <td className="border px-4 py-2">Protección frente a uso no autorizado</td>
        <td className="border px-4 py-2">1 año</td>
      </tr>
      <tr>
        <td className="border px-4 py-2">__Secure-3PAPISID</td>
        <td className="border px-4 py-2">Anuncios más relevantes y personalizados</td>
        <td className="border px-4 py-2">2 años</td>
      </tr>
      <tr>
        <td className="border px-4 py-2">__Secure-3PSID</td>
        <td className="border px-4 py-2">Perfil de usuario y anuncios personalizados</td>
        <td className="border px-4 py-2">2 años</td>
      </tr>
      <tr>
        <td className="border px-4 py-2">__Secure-3PSIDCC</td>
        <td className="border px-4 py-2">Protección frente a uso no autorizado</td>
        <td className="border px-4 py-2">1 año</td>
      </tr>
      <tr>
        <td className="border px-4 py-2">__Secure-ENID</td>
        <td className="border px-4 py-2">
          Recordar preferencias y configuraciones del usuario en Google
        </td>
        <td className="border px-4 py-2">1 año</td>
      </tr>
    </tbody>
  </table>
</section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-2">
          Cambios en nuestra política de cookies
        </h2>
        <p>
          Nos reservamos el derecho de modificar o actualizar esta política en
          cualquier momento. Te recomendamos revisarla regularmente para estar
          al tanto de los cambios.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Contacto</h2>
        <p>
          Si tienes alguna pregunta sobre nuestra política de cookies, puedes
          ponerte en contacto con nosotros:
        </p>
        <ul className="list-disc ml-6">
          <li>
            <strong>Correo electrónico:</strong>{" "}
            <a href="mailto:maragubit@gmail.com">maragubit@gmail.com</a>
          </li>
          <li>
            <strong>Dirección:</strong> c/ Padre Ruíz Candil 23. Jerez de la
            Frontera. Cádiz
          </li>
        </ul>
      </section>
    </main>
  </Container>);
}
export default CookiesPolicy;