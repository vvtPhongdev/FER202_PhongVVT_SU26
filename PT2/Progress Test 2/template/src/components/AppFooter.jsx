import about from '../data/about'

export default function AppFooter() {
  // TODO-08: Hiển thị footer với thông tin từ about.js:
  //   - Logo (about.logo) — thêm onError để ẩn ảnh nếu không load được
  //   - Copyright (about.copyright)
  //   - Phiên bản (about.version)
  //   - Môn học (about.course)
  // Dùng <footer> với class "border-top mt-4 py-3 text-center text-muted"
  return (
    <footer className="border-top mt-4 py-3 text-center text-muted">
      {/* TODO-08 */}
      <img
        src={about.logo}
        alt={about.appName}
        width="40"
        height="40"
        className="mb-2"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
      <div>{about.copyright}</div>
      <div>{about.version}</div>
      <div>{about.course}</div>
    </footer>
  )
}
