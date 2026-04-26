import "./styles/BrandLogo.css";

type BrandLogoProps = {
  variant?: "nav" | "loader";
};

const BrandLogo = ({ variant = "nav" }: BrandLogoProps) => {
  return (
    <div className={`brand-logo brand-logo--${variant}`}>
      <svg
        className="brand-logo-mark"
        viewBox="0 0 56 56"
        role="img"
        aria-label="EyaminDev logo"
      >
        <rect
          x="3"
          y="3"
          width="50"
          height="50"
          rx="16"
          fill="#110d16"
          stroke="#50366f"
        />
        <path
          d="M17 16.5H30.5M17 28H27.5M17 39.5H30.5M17 16.5V39.5"
          stroke="#F6F2FF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30.5 16.5H33.5C41 16.5 45 21.2 45 28C45 34.8 41 39.5 33.5 39.5H30.5"
          stroke="#C2A4FF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="42" cy="16.5" r="2.2" fill="#C2A4FF" />
      </svg>
      <span className="brand-logo-wordmark" aria-hidden="true">
        <span className="brand-logo-name">Eyamin</span>
        <span className="brand-logo-accent">Dev</span>
      </span>
    </div>
  );
};

export default BrandLogo;
