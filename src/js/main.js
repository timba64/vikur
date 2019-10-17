import {addBlockColor, makeAccordion, makeMenu} from './tmb';
import WOW from './wow';
import ready from './ready';

ready( function(tmp){
    const wow = new WOW(
        {
          animateClass: 'anime',
          offset:       0,
          mobile:       true,
        }
    );
    wow.init();
    makeMenu();
    addBlockColor();
    makeAccordion();
});
