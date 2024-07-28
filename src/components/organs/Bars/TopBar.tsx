import smallLogo from "../../../assets/mainLogoS.png";
import healthMate from "../../../assets/healthMateS.png";
import Calander from "../Calander";
import s from "./TopBar.module.scss";

export default function TopBar() {
  return (
    <div className={s.topBarContainer}>
      <div className={s.logoContainer}>
        <img src={smallLogo} alt="logo" className={s.logo} />
        <img src={healthMate} alt="healthMate" className={s.healthMate} />
      </div>
      <Calander />
    </div>
  );
}
