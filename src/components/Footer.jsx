import logo from '../assets/img/logo.png'; // Ajusta la ruta según tu estructura

function Footer() {
  return (
    <footer className="footer">
      <div style={{ height: '72.69px', backgroundColor: 'black' }}></div>

      <div className="tm-section-2">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <img src={logo} width="200" alt="Logo" />
            </div>
          </div>
        </div>
      </div>

      <div className="tm-bg-dark-blue">
        <div className="container">
          <div className="row">
            <p className="col-sm-12 text-center tm-font-light tm-color-white p-4 tm-margin-b-0">
              Copyright &copy;{' '}
              <span className="tm-current-year">2025</span> maragubit
              {' - '}
              Design:{' '}
              <a
                rel="nofollow"
                href="https://maragubit.es"
                className="tm-color-primary tm-font-normal"
                target="_parent"
              >
                maragubit
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
