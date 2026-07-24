import about from '../data/about'

export default function AppFooter() {
  // TODO-08: Hiển thị logo, copyright, version, course từ about.js
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <div className="container text-center">
        {/* TODO-08: Hiển thị logo image, appName, copyright, version, course */}
        <img src={about.logo} alt="logo" width="24" height="24" className="me-2" />
        <span className="me-2">{about.appName}</span>
        <span className="me-2">{about.copyright}</span>
        <span className="me-2">{about.version}</span>
        <span>{about.course}</span>
      </div>
    </footer>
  )
}
