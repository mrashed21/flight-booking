import DepartureDateSelect from "@/components/UI/DepartureDateSelect";
import { ScanQrCode } from "lucide-react";

const PassengerInfo = () => {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2>Passenger Adult (l)</h2>
        <button className="flex items-center">
          {" "}
          <ScanQrCode /> Scanning Passenger Passport
        </button>

      </div>

      {/* passenger info */}
      <div className="">
        <label htmlFor="">Frist Name </label>
        <input type="text" />
        <label htmlFor="">Last Name </label>
        <input type="text" />
        <label htmlFor="">Date of Birth</label>
        <DepartureDateSelect/>

        <button>Male</button>
        <button>Female</button>
        
      </div>
    </section>
  );
};

export default PassengerInfo;
