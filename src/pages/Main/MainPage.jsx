import Main from './Main';
import PopularWeeklyBoard from '../PopularWeeklyBoard/PopularWeeklyBoard';
import MainBoard from '../MainBoard/MainBoard';
import Map from '../Map/Map';
// import {SectionsContainer, Section} from 'react-fullpage';




const MainPage = () => {
    // let options = {
    //     anchors: ['sectionOne', 'sectionTwo', 'sectionThree', 'sectionFour'],
    //   };

  return(
    <>
    <PopularWeeklyBoard/>
    <MainBoard/>
    </>
//     <SectionsContainer {...options}>
//     <Section><Main/></Section>
//     <Section><PopularWeeklyBoard/></Section>
//     <Section><MainBoard/></Section>
//     <Section><Map/></Section>
//   </SectionsContainer>

  )
};

export default MainPage;