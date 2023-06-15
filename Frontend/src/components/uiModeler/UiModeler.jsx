import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';
import UiModelSidebar from "./UiModelSidebar";
import UiModelElement from "./UiModelElement";
import Popup from "./Popup";

function UiModeler() {
  const [currentUiModelElement, setCurrentUiModelElement] = useState("default");
  const [uiModelList, setUiModelList] = useState([]);
  const [currentApplication, setCurrentApplication] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState();
  const [inputValues, setInputValues] = useState({
    applicationId: "",
    applicationName: "",
    pageId: "",
    pageName: "",
    elementName: ""
  });

  useEffect(() => {
    setCurrentUiModelElement(currentUiModelElement)
  }, [currentUiModelElement])

  useEffect(() => {
    console.log(uiModelList)
  }, [uiModelList])

  useEffect(() => {
    setUiModelList([
      // {
      //   application_id: "1",
      //   application_name: "Outlook Web App",
      //   pages: [{
      //     page_id: "",
      //     page_name: "",
      //     ui_elements:  [{
      //       element_id: "", 
      //       element_name: "",
      //       current_mode: "",
      //       element_locators:{
      //           dom: {
      //               text:"",
      //               attributes:[{
      //                   name:"",
      //                   value:""},
      //                   {
      //                     name:"",
      //                     value:""
      //                 }],
      //               tag:"",
      //               path:""
      //           },
      //           surface:{
      //               point:{
      //                   absolute_coordinates: {
      //                       x: "",
      //                       y: ""
      //                   },
      //                   relative_coordinates: {
      //                       x: "",
      //                       y: ""
      //                   }
      //               },
      //               region:{
      //                   absolute_coordinates: {
      //                       one: "",
      //                       two: "",
      //                       three: "",
      //                       four: "",
      //                   },
      //                   relative_coordinates:{
      //                       one: "",
      //                       two: "",
      //                       three: "",
      //                       four: "",
      //                   }
      //               },
      //               image: ""
      //           },
      //           other: {
      //               keyboard_shortcut:""
      //           }
      //       }
      //     }]
      //   }]
      // },
      // {
      //   application_id: "2",
      //   application_name: "Payroll Web App",
      //   pages: [{
      //     page_id: "21",
      //     page_name: "Login Screen",
      //     ui_elements:  [{
      //       element_id: "211", 
      //       element_name: "Email Input",
      //       current_mode: "",
      //       element_locators:{
      //           dom: {
      //               text:"",
      //               attributes:[{
      //                   name:"",
      //                   value:""
      //               }],
      //               tag:"",
      //               path:""
      //           },
      //           surface:{
      //               point:{
      //                   absolute_coordinates: {
      //                       x: "",
      //                       y: ""
      //                   },
      //                   relative_coordinates: {
      //                       x: "",
      //                       y: ""
      //                   }
      //               },
      //               region:{
      //                   absolute_coordinates: {
      //                       one: "",
      //                       two: "",
      //                       three: "",
      //                       four: "",
      //                   },
      //                   relative_coordinates:{
      //                       one: "",
      //                       two: "",
      //                       three: "",
      //                       four: "",
      //                   }
      //               },
      //               image: ""
      //           },
      //           other: {
      //               keyboard_shortcut:""
      //           }
      //       }
      //     }]
      //   }]
      // }
    ])
  }, [])

  const handleModelInterfaceChange = (updatedCurrentUiModel) => {
    setCurrentUiModelElement(updatedCurrentUiModel);
  };
  const addToUiModel = (type) => {
    setPopupType(type);
    setShowPopup(true);
  };

  const createUiModel = (applicationName, pageName) => {
    const newUiModel = {
        application_id: "",
        application_name: applicationName,
        pages: [{
          page_id: "",
          page_name: pageName,
          ui_elements:  []
        }]
      }
    const newUiModelList = [...uiModelList, newUiModel];
    setUiModelList(newUiModelList)
}

const createUiModelPage = (pageName) => {
  const newUiModelList = uiModelList.map((uiModel) => {
    if (uiModel.application_name == currentApplication) {
      const updatedPages = [
        ...uiModel.pages, {
          page_id: "",
          page_name: pageName,
          ui_elements:  []
        }
      ] 
      uiModel.pages =  updatedPages
    }
    return uiModel
  })
  setUiModelList(newUiModelList)
}

const createUiModelElement = (elementName) => {
  const newUiModelList = uiModelList.map((uiModel) => {
    if (uiModel.application_name == currentApplication) {
      uiModel.pages.map((page) => {
        if(page.page_name == currentPage) {
          const updatedElements= [
            ...page.ui_elements, {
                element_id: "", 
                element_name: elementName,
                current_mode: "",
                element_locators:{
                    dom: {
                        text:"",
                        attributes:[],
                        tag:"",
                        path:""
                    },
                    surface:{
                        point:{
                            absolute_coordinates: {
                                x: "",
                                y: ""
                            },
                            relative_coordinates: {
                                x: "",
                                y: ""
                            }
                        },
                        region:{
                            absolute_coordinates: {
                                one: {
                                  x: "",
                                  y: ""
                                },
                                two: {
                                  x: "",
                                  y: ""
                                },
                                three: {
                                  x: "",
                                  y: ""
                                },
                                four: {
                                  x: "",
                                  y: ""
                                },
                            },
                            relative_coordinates:{
                                one: {
                                  x: "",
                                  y: ""
                                },
                                two: {
                                  x: "",
                                  y: ""
                                },
                                three: {
                                  x: "",
                                  y: ""
                                },
                                four: {
                                  x: "",
                                  y: ""
                                },
                            }
                        },
                        image: ""
                    },
                    other: {
                        keyboard_shortcut:""
                    }
                }
              }
          ] 
          page.ui_elements =  updatedElements
        }
      }) 
    }
    return uiModel
  })
  setUiModelList(newUiModelList)
}

const createUiModelElementLocatorAttribute = (attributeName) => {
  const newUiModelList = uiModelList.map((uiModel) => {
    if (uiModel.application_name == currentApplication) {
      uiModel.pages.map((page) => {
        if(page.page_name == currentPage) {
          page.ui_elements.map((element) => {
            if(element.element_name == currentUiModelElement.element_name) {
              const updatedAttributes= [
                ...element.element_locators.dom.attributes, {
                                name: attributeName,
                                value:""}
              ] 
              element.element_locators.dom.attributes = updatedAttributes
            }
          })
        }
      }) 
    }
    return uiModel
  })
  setUiModelList(newUiModelList)
}

const setCurrentUiModel = (applicationName) => {
  console.log("updated application " + applicationName)
  setCurrentApplication(applicationName)
}

const setCurrentUiModelPage = (pageName) => {
  setCurrentPage(pageName)
}

const updateUiModelElement = (uiModelListWithUpdatedElement) => {
  setUiModelList(uiModelListWithUpdatedElement)
}

  const closePopup = () => {
    setShowPopup(false);
    setInputValues({
      applicationId: "",
      applicationName: "",
      pageId: "",
      pageName: "",
      elementName: ""
    });
  };

  return (
    <div className="uiModelerWrapper">
      <UiModelSidebar handleModelInterfaceChange={handleModelInterfaceChange} uiModelList={uiModelList} addToUiModel={addToUiModel} setCurrentUiModel={setCurrentUiModel} setCurrentUiModelPage={setCurrentUiModelPage} />
      <UiModelElement 
        currentUiModelElement={currentUiModelElement}
        uiModelList={uiModelList}
        currentApplication={currentApplication}
        currentPage={currentPage}
        updateUiModelElement={updateUiModelElement}
        addToUiModel={addToUiModel}
      >
      </UiModelElement>
      {showPopup && (
        <Popup
          createUiModel={createUiModel}
          createUiModelPage={createUiModelPage}
          createUiModelElement={createUiModelElement}
          createUiModelElementLocatorAttribute={createUiModelElementLocatorAttribute}
          closePopup={closePopup}
          inputValues={inputValues}
          setInputValues={setInputValues}
          popupType={popupType}
        />
      )}
    </div>
  )
}
export default UiModeler;