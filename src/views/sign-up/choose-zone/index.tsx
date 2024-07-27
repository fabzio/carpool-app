import styles from "./index.module.css";
import { useQuery } from "@tanstack/react-query";
import { Error, Loading } from "@components";
import ZoneList from "./ZoneList";
import ZoneService from "@services/zone.service";
import QueryKeys from "@constants/queryKeys.constants";

export default function ChooseZone() {
  const {
    data: zones,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QueryKeys.ZONES],
    queryFn: ZoneService.getZones,
  });

  if (error) return <Error />;

  return (
    <div className={styles.container}>
      <h3 className={styles.welcomeTxt}>Empecemos</h3>
      <p className={styles.chooseZoneTxt}>Elige tu zona para continuar</p>
      {isLoading ? <Loading elem /> : <ZoneList zones={zones!} />}
    </div>
  );
}
