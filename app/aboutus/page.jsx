import NavBar from'/components/NavBar'
import MainSection from '/components/MainSection';
import InfoSection from '@/components/InfoSection';
export default function aboutus() {
  return (
    <div style={styles.app}>
            <NavBar />
            {/* <h2>hi</h2> */}
            {/* <MainSection /> */}
            <InfoSection />
        </div>
  )
}
const styles = {
    app: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
};
