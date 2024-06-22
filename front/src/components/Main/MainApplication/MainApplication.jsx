import {useState} from "react";
import SpecifyGenderForm from "./SpecifyGenderForm/SpecifyGender";
import PhysicalActivityForm from "./PhysicalActivityForm/PhysicalActivityForm";
import ParametersForm from "./ParametersForm/ParametersForm";

export default function MainApplication() {
  const [gender, setGender] = useState();
  const [physical, setPhysical] = useState();
  return (
    <div>
      {!gender ? <SpecifyGenderForm setGender={setGender} /> : null}
      {gender && !physical && (
        <PhysicalActivityForm setPhysical={setPhysical} setGender={setGender} />
      )}
      {gender && physical && (
        <ParametersForm
          physical={physical}
          setPhysical={setPhysical}
          gender={gender}
        />
      )}
    </div>
  );
}
