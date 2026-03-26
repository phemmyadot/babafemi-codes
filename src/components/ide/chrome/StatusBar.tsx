interface StatusBarProps {
  fileName: string
  lang: string
}

export function StatusBar({ fileName, lang }: StatusBarProps) {
  return (
    <div className="statusbar">
      <div className="statusbar-left">
        <div className="status-item">
          <span className="status-icon">⎇</span>
          <span>main</span>
        </div>
        <div className="status-item">
          <span className="status-icon">✓</span>
          <span>0 errors, 0 warnings</span>
        </div>
      </div>
      <div className="statusbar-right">
        <div className="status-item">{fileName}</div>
        <div className="status-item">Ln 1, Col 1</div>
        <div className="status-item">UTF-8</div>
        <div className="status-item">{lang}</div>
        <div className="status-item">Prettier</div>
      </div>
    </div>
  )
}
