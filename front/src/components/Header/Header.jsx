

import RoundButton from "../Buttons/RoundButton/RoundButton";
import SvgSelector from "../SvgSelector";

export default function Header() {
  return (
    <header>
      <div>
        <SvgSelector name={"logo"} />
      </div>

      <div></div>
      <div>
        <RoundButton onClick = {""}>
          <SvgSelector name={"love"} />
        </RoundButton>
      </div>
    </header>
  );
}
