$(function() {
  $('html').addClass("govuk-template");
  $('body').addClass("govuk-template__body");
});

document.addEventListener('DOMContentLoaded', function() {

  	$(document.body).addClass('js-enabled');
  
    /* cookie banner starts */  
    //to delete cookie banner cookies ...
  	//document.cookie = "seen_cookie_message_help=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  	//document.cookie = "AnalyticsConsent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
    function writeCookie (key, value, days) {
        var date = new Date();
        days = days || 365;// Default at 365 days
        date.setTime(+ date + (days * 86400000)); //24 * 60 * 60 * 1000
        window.document.cookie = key + "=" + value + "; expires=" + date.toGMTString() + "; path=/";
        return value;
    }  
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
  
    var $cookieBanner = $('#global-cookie-message-help');
    var cookieHelp = readCookie('seen_cookie_message_help');
		
  	if (cookieHelp == null) {//cookie does not exist
      var href = $cookieBanner.find('.gem-c-cookie-banner__button-settings').find('.gem-c-button').attr('href');
      var url = window.location.href; 
    }

  	if(href == url){
     	$cookieBanner.find('.gem-c-cookie-banner__wrapper').hide();   
    }else if (cookieHelp == null) {//cookie doesn't exist
      $cookieBanner.find('.gem-c-cookie-banner__wrapper').show(); 
    }
  
    $cookieBanner.find('button.gem-c-button').click(function(){
      writeCookie('seen_cookie_message_help','cookie_policy',365); 
      writeCookie('AnalyticsConsent','true',365); 

      $cookieBanner.find('.gem-c-cookie-banner__wrapper').hide(); 
      var $cookieConfirm = $cookieBanner.find('.gem-c-cookie-banner__confirmation');
      
      $cookieConfirm.show().find('.gem-c-cookie-banner__hide-button').click(function(){
        $cookieConfirm.hide();
      });
    });
  /* cookie banner ends */


  
/* *** maintain list state on back-button, starts *** */      
var requestSubject = $('#request_subject');
 
if(requestSubject.length){//if the contact form with subject search articles options
  var mySearchDiv = $('.suggestion-list');

  $(window).on('beforeunload', function(){//when refreshing the page
      $('#tempList').remove();
  });

  if(localStorage.getItem("thisURL") == window.location.href){//back-button used?
    //$(window).on('load', function(){
        requestSubject.val(localStorage.getItem("theInputVal"));
    //}); 
    mySearchDiv.html('<div id="tempList">'+ localStorage.getItem("theListHTML") +'</div>');
  }else{
    requestSubject.val('');
    requestSubject.attr("autocomplete", "off");
  }
  $('body').on('click',mySearchDiv.find('a'), function(){
    var theList = mySearchDiv.html();
    var theVal = requestSubject.val();
    localStorage.setItem("theListHTML", theList);
    localStorage.setItem("theInputVal", theVal); 
  });
  requestSubject.keyup(function(){
    $('#tempList').remove();
  });

  localStorage.setItem("thisURL", window.location.href);        
}else{//all other pages
  $('.submit-a-request').add('.govuk-link').click(function(){//.govuk-link = feedback button
    localStorage.setItem("theInputVal", "");//not removeItem
    localStorage.setItem("theListHTML", "");//not removeItem
  });
}
/* *** maintain list state on back-button, ends *** */    
  
  

	/* <start> New Ticket Request page */
  	if(jQuery('#new_request').length){//we're on a ticket form page

    
    /*
    	// $('#request_subject').val('apprentice').change();
    	$('#request_subject').trigger('input');
    	$('#request_subject').trigger('keyup');

    setTimeout(function() { 
    	// $('#request_subject').val('apprentice ').change();
    	$('#request_subject').trigger('input');
    	$('#request_subject').trigger('keyup');
    }, 2000);

    setTimeout(function() { 
    	// $('#request_subject').val('data lock').change();
    	$('#request_subject').trigger('input');
    	$('#request_subject').trigger('keyup');
    }, 6000);
    */

  //   $('#request_subject')
  // .trigger({
  //   type: 'keypress',
  //   which: 'a'      
  //  });
    
      //var $das_feedback_form = $('#das-feedback-form');
      var ticketForm = $('#request_issue_type_select').find('option:selected').val();
    	var $new_request = $('#new_request');
    
      if(ticketForm != undefined ) {
        var $request_anonymous_requester_email = $('#request_anonymous_requester_email');
        var $request_description_hint = $('#request_description_hint');
        var $request_description_label = $('#request_description_label');	

        /* Remove attachments due to virus concerns */
         $new_request.find('label[for=request-attachments]').parent().remove();//addClass('hide');
        
        // function restyleAttachments(){//keep for future use
        //   $new_request.find('label[for=request-attachments]').html('Add a file');
        //   $('<p class="govuk-hint govuk-body-s">You can add up to 5 photos or files.</p>').insertBefore($('#upload-dropzone')); 
        // }        
        
        /* Feedback page */
        if(ticketForm == 360000307679) {
          $('#ticket-heading').html('Give feedback');
          $request_description_label.html('Your feedback');
					$request_description_hint.hide();
          $('<p class="govuk-hint govuk-body-s">We’ll send you an email to confirm we received your feedback.</p>').insertBefore($request_anonymous_requester_email);
          $('#request_subject').val('Feedback').parent().hide();
          $new_request.find('label[for=request_anonymous_requester_email]').html('Your email address (optional)');

          // If we submit a form without email then supply an "anonymous" email to satisfy backend validation
          $new_request.submit(function(){
            if( !($request_anonymous_requester_email.val().trim()) )  {
               $request_anonymous_requester_email.val("anonymous@example.com").css('color', '#fff'); // so there isn't a jarring email appear on screen;
            }
          });      

          // If we've reloaded an anonymous submission (due to other validation failures) then hide the anonymous email again
          if($request_anonymous_requester_email.val() == 'anonymous@example.com'){
            $request_anonymous_requester_email.val('');
          }

        /* "Send a message" page */
        }else if(ticketForm = 360000322720) {
           $request_description_label.html('Your message');
          $request_description_hint.hide(); 
          $('<p class="govuk-hint govuk-body-s">We’ll send you an email to confirm we received your message. During our opening times, we’ll reply within 4 hours.</p>').insertBefore($request_anonymous_requester_email); 
        }
        
        $new_request.find('input[name="commit"]').val('Send');
      }

      $('#request_subject_label').after('<span id="subject-hint" class="govuk-hint govuk-body-s">We may suggest articles based on what you enter.</span>');
      $new_request.find('.suggestion-list').attr('aria-describedby', 'subject-hint');
    
    
      //************************************ error msgs start...
      var emailError = $('#request_anonymous_requester_email_error');
      if(emailError.length){//this only appears if email is required! Ignore aria-required values as zendesk sets them incorrectly/inconsistently
        if(!$('#request_anonymous_requester_email').val()){//input element is empty
          emailError.text('Enter your email address'); 
        }else{//input must be invalid and as sendAMsgPg is present
          emailError.text('Enter an email address in the correct format, like name@example.com'); 
        }
      } 

      $('#request_subject_error').text('Enter a subject');

      var descError = $('#request_description_error');
      if(descError.length){
        var myLab = $('#request_description_label').text().toLowerCase();   

        if(myLab.includes('feedback') === true){//gracefull fail in ie11
          descError.text('Enter your feedback');
        }else if(myLab.includes('message') === true){
          descError.text('Enter your message');
        }
      }    
      //******************************* error msgs ends.
  }
  /* <end> New Ticket Request page */
  
  
  if($('#full_width_pg').length){//if this id is used once in an article all pg layout is changed to full width 
    $('#main-content').find('> .govuk-grid-row > .govuk-grid-column-two-thirds').addClass('govuk-grid-column-full').removeClass('govuk-grid-column-two-thirds');   
  }
  
    /* Cookie Article, with consent starts */
    var cookieConsent = $('#select-measure-analytics'); 
    if(cookieConsent.length ) {
          /*cookieConsent.addClass('govuk-list govuk-radios')
          .append('<li class="govuk-radios__item"><label><input id="cookie-consent-Yes" type="radio" name="allow-analytics" class="gem-radios__input">Yes</label></li>' +
          '<li class="govuk-radios__item"><label><input id="cookie-consent-No" type="radio" name="allow-analytics" class="gem-radios__input">No</label></li>');*/
      		
      		cookieConsent.removeAttr('aria-hidden').append('<div class="govuk-form-group"><fieldset class="govuk-fieldset"><legend class="govuk-fieldset__legend govuk-fieldset__legend--m"><h3 class="govuk-fieldset__heading">Do you want us to measure your website use with Google Analytics?</h3></legend><div class="govuk-radios"><div class="govuk-radios__item"><input class="govuk-radios__input" id="cookie-consent-Yes" name="allow-analytics" type="radio"><label class="govuk-label govuk-radios__label" for="cookie-consent-Yes">Yes</label></div><div class="govuk-radios__item"><input class="govuk-radios__input" id="cookie-consent-No" name="allow-analytics" type="radio"><label class="govuk-label govuk-radios__label" for="cookie-consent-No">No</label></div></div></fieldset></div>');

          var cookieGoogle = readCookie('AnalyticsConsent');

          if(cookieGoogle == 'false'){
            $('#cookie-consent-No').prop("checked", true);
            $('#cookie-consent-Yes').prop("checked", false);
          }else{//not false (unset or true)
            $('#cookie-consent-Yes').prop("checked", true);
            $('#cookie-consent-No').prop("checked", false);
          }   

          $('#cookie-consent-Yes').change(function() {
            writeCookie('AnalyticsConsent','true',365); 
            writeCookie('seen_cookie_message_help','cookie_policy',365); //also turn off cookie banner
          });
          $('#cookie-consent-No').change(function() {
            writeCookie('AnalyticsConsent','false',365); //document.cookie = "AnalyticsConsent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; //delete cookie
            writeCookie('seen_cookie_message_help','cookie_policy',365); //also turn off cookie banner
          });
  }
 /* Cookie Article, with consent ends */
 
    /*
  function closest (element, selector) {
    if (Element.prototype.closest) {
      return element.closest(selector);
    }
    do {
      if (Element.prototype.matches && element.matches(selector)
        || Element.prototype.msMatchesSelector && element.msMatchesSelector(selector)
        || Element.prototype.webkitMatchesSelector && element.webkitMatchesSelector(selector)) {
        return element;
      }
      element = element.parentElement || element.parentNode;
    } while (element !== null && element.nodeType === 1);
    return null;
  }

  // social share popups
  Array.prototype.forEach.call(document.querySelectorAll('.share a'), function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      window.open(this.href, '', 'height = 500, width = 500');
    });
  });

  // show form controls when the textarea receives focus or backbutton is used and value exists
  var commentContainerTextarea = document.querySelector('.comment-container textarea'),
    commentContainerFormControls = document.querySelector('.comment-form-controls, .comment-ccs');

  if (commentContainerTextarea) {
    commentContainerTextarea.addEventListener('focus', function focusCommentContainerTextarea() {
      commentContainerFormControls.style.display = 'block';
      commentContainerTextarea.removeEventListener('focus', focusCommentContainerTextarea);
    });

    if (commentContainerTextarea.value !== '') {
      commentContainerFormControls.style.display = 'block';
    }
  }

  // Expand Request comment form when Add to conversation is clicked
  var showRequestCommentContainerTrigger = document.querySelector('.request-container .comment-container .comment-show-container'),
    requestCommentFields = document.querySelectorAll('.request-container .comment-container .comment-fields'),
    requestCommentSubmit = document.querySelector('.request-container .comment-container .request-submit-comment');

  if (showRequestCommentContainerTrigger) {
    showRequestCommentContainerTrigger.addEventListener('click', function() {
      showRequestCommentContainerTrigger.style.display = 'none';
      Array.prototype.forEach.call(requestCommentFields, function(e) { e.style.display = 'block'; });
      requestCommentSubmit.style.display = 'inline-block';

      if (commentContainerTextarea) {
        commentContainerTextarea.focus();
      }
    });
  }

  // Mark as solved button
  var requestMarkAsSolvedButton = document.querySelector('.request-container .mark-as-solved:not([data-disabled])'),
    requestMarkAsSolvedCheckbox = document.querySelector('.request-container .comment-container input[type=checkbox]'),
    requestCommentSubmitButton = document.querySelector('.request-container .comment-container input[type=submit]');

  if (requestMarkAsSolvedButton) {
    requestMarkAsSolvedButton.addEventListener('click', function () {
      requestMarkAsSolvedCheckbox.setAttribute('checked', true);
      requestCommentSubmitButton.disabled = true;
      this.setAttribute('data-disabled', true);
      // Element.closest is not supported in IE11
      closest(this, 'form').submit();
    });
  }

  // Change Mark as solved text according to whether comment is filled
  var requestCommentTextarea = document.querySelector('.request-container .comment-container textarea');

  if (requestCommentTextarea) {
    requestCommentTextarea.addEventListener('input', function() {
      if (requestCommentTextarea.value === '') {
        if (requestMarkAsSolvedButton) {
          requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-translation');
        }
        requestCommentSubmitButton.disabled = true;
      } else {
        if (requestMarkAsSolvedButton) {
          requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-and-submit-translation');
        }
        requestCommentSubmitButton.disabled = false;
      }
    });
  }

  // Disable submit button if textarea is empty
  if (requestCommentTextarea && requestCommentTextarea.value === '') {
    requestCommentSubmitButton.disabled = true;
  }

  // Submit requests filter form in the request list page
  Array.prototype.forEach.call(document.querySelectorAll('#request-status-select, #request-organization-select'), function(el) {
    el.addEventListener('change', function(e) {
      e.stopPropagation();
      closest(this, 'form').submit();
    });
  });

  function toggleNavigation(toggleElement) {
    var menu = document.getElementById('user-nav');
    var isExpanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', !isExpanded);
    toggleElement.setAttribute('aria-expanded', !isExpanded);
  }

  var burgerMenu = document.querySelector('.header .icon-menu');
  var userMenu = document.querySelector('#user-nav');

  burgerMenu.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleNavigation(this);
  });

  burgerMenu.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) { // Enter key
      e.stopPropagation();
      toggleNavigation(this);
    }
  });

  userMenu.addEventListener('keyup', function(e) {
    if (e.keyCode === 27) { // Escape key
      e.stopPropagation();
      this.setAttribute('aria-expanded', false);
      burgerMenu.setAttribute('aria-expanded', false);
    }
  });

  if (userMenu.children.length === 0) {
    burgerMenu.style.display = 'none';
  }

  // Submit organization form in the request page
  var requestOrganisationSelect = document.querySelector('#request-organization select');

  if (requestOrganisationSelect) {
    requestOrganisationSelect.addEventListener('change', function() {
      closest(this, 'form').submit();
    });
  }

  // Toggles expanded aria to collapsible elements
  Array.prototype.forEach.call(document.querySelectorAll('.collapsible-nav, .collapsible-sidebar'), function(el) {
    el.addEventListener('click', function(e) {
      e.stopPropagation();
      var isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
    });
  });

  // If a section has more than 6 subsections, we collapse the list, and show a trigger to display them all
  const seeAllTrigger = document.querySelector("#see-all-sections-trigger");
  const subsectionsList = document.querySelector(".section-list");

  if (subsectionsList && subsectionsList.children.length > 6) {
    seeAllTrigger.setAttribute("aria-hidden", false);

    seeAllTrigger.addEventListener("click", function(e) {
      subsectionsList.classList.remove("section-list--collapsed");
      seeAllTrigger.parentNode.removeChild(seeAllTrigger);
    });
  }
  
  
  ******************** back up example of messing with the DOM in the widget ******* */
  
  
 //$('#webWidget').contents().find('head').append('<style id="prop">#ourFormWrapper {border: 1px solid red; padding: 20px;}</style>').end().find('#Embed').find('div[role="presentation"]').find('> div:first-child > div').attr('id', 'remove-me').children().css({position:'absolute', left:'-3000px', top:'-3000px'}).parent().append('<div id="ourFormWrapper"><form id="ourForm" action="myURL"><div id="innerFormWrapper"><input type="text" width="100px" placeholder="My form element" /><br><input type="button" value="SUBMIT"></div></form></div>');
  
//var targetNode = document.querySelector("#webWidget");
//var observerOptions = {childList: true, attributes: true }

  
  function makeWidgetChanges(){

    $('#webWidget').contents().find('h1').text('Apprenticeship Service Support').end().find('#Embed').addClass('esfa-widget').end()
        .find('#webWidget-styles').remove().end().find('head').prepend('<style id="webWidget-styles">'+
        '#Embed.esfa-widget * {font-family: "GDS Transport",Arial,sans-serif !important; }'+
        '#Embed.esfa-widget .botBackground-3Trmm {color: 0b0c0c !important; }'+
 				'#Embed.esfa-widget .dekQWu, #Embed.esfa-widget div[data-embed="answerBot"] > div, #Embed.esfa-widget div[data-embed="chat"] > div, '+
        '#Embed.esfa-widget div[data-embed="ticketSubmissionForm"] > div, #Embed.esfa-widget textarea, #Embed.esfa-widget input {border-radius: 0 0 0 0 !important; }'+
				'#Embed.esfa-widget div[class^="messages-"], #Embed.esfa-widget div[class^="messageBubble-"], #Embed.esfa-widget textarea, #Embed.esfa-widget input {font-size: 14px !important;}'+                                                   
        '#Embed.esfa-widget #garden-field-container-0--input::placeholder {color: #626a6e; opacity: 1; }'+
        '#Embed.esfa-widget #garden-field-container-0--input:-ms-input-placeholder {color: #626a6e; }'+
        '#Embed.esfa-widget #garden-field-container-0--input::-ms-input-placeholder {color: #626a6e; }'+
      	'#Embed.esfa-widget textarea, #Embed.esfa-widget input {border-color: #b1b4b6 !important; }'+
      '</style>');
    
      /*var autoAnswers = $('#automaticAnswers').contents();
      var autoAnswersMsg = autoAnswers.find('.AutomaticAnswersDesktop-message');
      var btnNo, btnAlt; 
    	var p = autoAnswers.find('p.Error');

      if(autoAnswers.find('p.AutomaticAnswersDesktop-message.AutomaticAnswersDesktop-solve').length){//first yes/no form. form 1.
        autoAnswersMsg.css('border','1px dashed red');
        
        p.siblings('p').html('<b>This is REPLACEMENT text</b>').css({'display':'inline-block','width':'100%','textAlign':'center','borderBottom':'none'}).removeClass('u-paddingBM')
    		.closest('.AutomaticAnswersDesktop').css('minHeight','180px');
        
        btnNo = autoAnswers.find('input[value="No"]');//No 
        btnAlt = btnNo.siblings('input');
				
        btnNo.val("No this is NEW value");
        btnAlt.val('Yes, NEW text');
        
        btnNo.add(btnAlt).css({'width':'100%','maxWidth':'100%','margin': '5px 0 0 0'});

      }else if(autoAnswers.find('div.AutomaticAnswersDesktop-message').length){//why yes/no form. form 2
        autoAnswersMsg.css('border','1px dashed gold');
        
        p.siblings('strong').text('Tell us why REPLACEMENT text');
        autoAnswers.find('.Icon--close').hide();//must remove this x close option
        
        btnNo = autoAnswers.find(p).next('input[type="submit"]'); //It's not related to my question
        btnAlt = btnNo.siblings('input');
        
        btnNo.val("Not related - my TEXT here");
        btnAlt.val('Is related - my TEXT here');

      }else if(autoAnswers.find('p.AutomaticAnswersDesktop-message').length){//confirmation. form 3
         autoAnswersMsg.css('border','1px dashed green');
				 
         //code here...
      }*/
  }
    
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  var observer = new MutationObserver(function(mutations, observer){// fired when a mutation occurs //console.log(mutations, observer);
    makeWidgetChanges();
  });
  observer.observe(document, {subtree: true, attributes: true });//this level needed for <style> injection: observer.observe(document, {subtree: true, attributes: true, childList: true });

  
  
    

  
  
  //$('#webWidget').contents().find('body').append('<style>#ourFormWrapper {border: 1px solid red; padding: 20px;}</style>').end().find('#Embed').find('div[role="presentation"]').find('> div:first-child > div').attr('id', 'remove-me').children().css({position:'absolute', left:'-3000px', top:'-3000px'}).parent().append('<div id="ourFormWrapper"><form id="ourForm" action="myURL"><div id="innerFormWrapper"><input type="text" width="100px" placeholder="My form element" /><br><input type="button" value="SUBMIT"></div></form></div>');
  
  
  
  
 //$('#webWidget').contents().find('body').append('<style>div[class*="messageBubbleWithOptions-"] + ul .u-hiddenButton button {background: lime; border: 1px solid red; }#Embed{border: 2px dashed lime;}</style>').end();

  
   window.zESettings = {
    webWidget: {
      helpCenter: {
        suppress: true
      },
      contactForm: {
        suppress: true
      },
      chat: {
        menuOptions: {
          emailTranscript: false
        }
      },
       answerBot: {
        suppress: true
       }
    }
  };
  
  zE('webWidget:on', 'chat:status', function(status) {
    console.log('This chat session is now', status);
    $(status == 'offline' ? '#chat-available' : '#chat-unavailable').hide();
    $(status == 'offline' ? '#chat-unavailable' : '#chat-available').show();
  });  

});

            /*var iframes = $(document.body).children('iframe[data-product]');
            if(iframes.length > 1){//if zendesk haven't fixed the bug
              iframes.eq(1).remove();//bug fix by removing duplicate iframe
            } */ 

window.dataLayer = window.dataLayer || [];
    window.onload = function() {
      
      		$('iframe[data-product]').eq(1).remove();//bug fix to remove duplicate iframe
      
      		
      
          setTimeout(function() {

            var widgetLauncher = $('#launcher'),
                widgetHelpButton = widgetLauncher.contents().find('button');

            if (widgetLauncher.length > 0 && widgetHelpButton.length > 0) {
                widgetHelpButton.on('click', function() {
                    gtmEventPush({'action' : 'Help button clicked'});
                    widgetOpened();
                })
            }
          }, 1500);
    }

    
    var widgetOpened = function() {
        setTimeout(function() {
          
            var widgetLauncherInnerWidget = $('#webWidget');
            searchFormEvents(widgetLauncherInnerWidget);
            setTimeout(function() {
                checkForSearchResults(widgetLauncherInnerWidget);
            }, 200);
        }, 200);
    }

    var searchFormEvents = function(container) {

        var searchForm = container.contents().find('form'),
        searchTextField = container.contents().find('input[id^="garden-field-container"]'),
        searchIcon = searchTextField.next()
        searchForm.unbind('submit')
        searchForm.on('submit', function() {
            searchFormSubmit(searchTextField)
        })

        searchIcon.unbind('click')
        searchIcon.on('click', function() {
            searchFormSubmit(searchTextField)
        })
    }
    
    var searchFormSubmit = function(textField) {
        searchSubmit(textField.val())
        setTimeout(function() {

            // Did the search product results, if so attach events
            var widgetLauncherInnerWidget = $('#webWidget');

            setTimeout(function() {
                checkForSearchResults(widgetLauncherInnerWidget);
            }, 500);

            checkForSearchResults(widgetLauncherInnerWidget);

            setTimeout(function() {
                searchFormEvents(widgetLauncherInnerWidget);
            }, 200)

            // Set up search form events again because the view may reload if no results are found
            searchFormEvents(widgetLauncherInnerWidget);

        }, 200);
    }

    var checkForSearchResults = function(container) {
        var listResultsLinks = container.contents().find('ol > li > a');
        if (listResultsLinks.length > 0) {
          trackSearchResults(listResultsLinks, container)
        }

    }

    var trackSearchResults = function(links, container) {
        links.unbind('click');
        links.on('click', function() {
          // Track article title click
          articleClick($(this).html());
          // Setup events on the article view
          articlePageEvents(container);
        })
    }

    var articlePageEvents = function(container) {
      setTimeout(function() {
          var backButton = container.contents().find('button').eq(0);
          backButton.unbind('click');
          backButton.on('click', function() {
            widgetOpened();
          });
      });
    }

    var articleClick = function(title) {
        gtmEventPush({'action' : 'Article clicked', 'title' : title})
    }

    var searchSubmit = function(term) {
        gtmEventPush({'action' : 'Search form submitted', 'term' : term})
    }

    var gtmEventPush = function(eventObj) {
      eventObj.event = 'widget'
      window.dataLayer.push(eventObj)
      console.log(eventObj)
    }
    
 

