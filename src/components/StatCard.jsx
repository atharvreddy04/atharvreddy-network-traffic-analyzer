function StatCard({
  title,
  value,
  description,
  icon: Icon,
  status = "normal",
}) {
  return (
    <div className="stat-card">

      <div className={`stat-icon ${status}`}>
        {Icon && <Icon size={22} />}
      </div>

      <div className="stat-content">

        <p className="stat-title">
          {title}
        </p>

        <h2 className="stat-value">
          {value}
        </h2>

        {description && (
          <span className="stat-description">
            {description}
          </span>
        )}

      </div>

    </div>
  );
}

export default StatCard;