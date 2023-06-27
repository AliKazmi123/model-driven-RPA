*** Settings ***
Documentation     Get Data from JSON and use that in robot.
Library    RPA.Browser.Selenium  auto_close=${FALSE}
Library    RPA.HTTP
Library    OperatingSystem
Library    BuiltIn
Library    RPA.JSON
Library    RPA.Desktop
Library    Collections
Library    ../utils/OCR.py
Resource   ../utils/utils.robot




*** Keywords ***

    

Click Button Model
    [Arguments]    ${element}  ${application_name}  ${page_nam}      
    Set Suite Variable  ${model_name}    ${application_name} 
    Set Suite Variable  ${page_name}    ${page_nam} 
    Set Suite Variable  ${element_name}   ${element[" element_name"]} 
    Set Suite Variable  ${current_mode}   ${element["current_mode"]} 
    Set Suite Variable  ${element_locators}     ${element["element_locators"]} 
    @{keyword_list}=    Create List    Click Button By ID    Click Button By Path    Click Button By Label   Click Button By Image

   
    ${id}=   Get ID From Attributes  ${element_locators["dom"]["attributes"]}
    Set Suite Variable  ${id}
    Set Suite Variable  ${path}   ${element_locators["dom"]["path"]}
    Set Suite Variable  ${text}   ${element_locators["dom"]["text"]}
    Set Suite Variable  ${image}  ${element_locators["surface"]["image"]}

    
  ${removed_keyword}=    Run Keyword If    '${current_mode}' == 'ID'    Remove From List    ${keyword_list}    0
...    ELSE IF    '${current_mode}' == 'PATH'    Remove From List    ${keyword_list}    1
...    ELSE IF    '${current_mode}' == 'LABEL'    Remove From List    ${keyword_list}    2
...    ELSE IF    '${current_mode}' == 'OCR'    Remove From List    ${keyword_list}    3


    Set Suite Variable  ${interaction_status}   ${EMPTY} 

    Run Keyword    ${removed_keyword}    

    FOR    ${keyword}    IN    @{keyword_list}
       Run Keyword If    '${interaction_status}' == 'Fail'    ${keyword}    
    END
   
    
Click Button By ID
    ${element_exists}    Run Keyword And Return Status    Element Should Be Visible    id=${id}
    Run Keyword If    '${element_exists}' == 'True'  Run Keywords    Set Suite Variable    ${interaction_status}  Pass  AND  Click Element    id=${id}
    ...  ELSE    Run Keywords   Set Suite Variable    ${interaction_status}  Fail  AND  Create Error  ${model_name}  ${page_name}  ${element_name}  'id'
    

Click Button By Path
    ${element_exists}    Run Keyword And Return Status    Element Should Be Visible    xpath=${path}
    Run Keyword If    '${element_exists}' == 'True'  Run Keywords    Set Suite Variable    ${interaction_status}  Pass  AND  Click Element    xpath=${path}
    ...  ELSE  Run Keywords   Set Suite Variable    ${interaction_status}  Fail  AND  Create Error  ${model_name}  ${page_name}  ${element_name}  'path'

Click Button By Label
    ${element_exists}    Run Keyword And Return Status    Element Should Be Visible    xpath=//a[text()='${text}']
    Run Keyword If    '${element_exists}' == 'True'  Run Keywords    Set Suite Variable    ${interaction_status}  Pass  AND  Click Element   xpath=//a[text()='${text}']
    ...  ELSE    Run Keywords   Set Suite Variable    ${interaction_status}  Fail  AND  Create Error  ${model_name}  ${page_name}  ${element_name}  'text'


Click Button By Image
    ${text_image}=       Perform OCR      ${image}   ${text} 
    log    ${text_image}
    ${element_exists}    Run Keyword And Return Status    Element Should Be Visible    xpath=//a[text()='${text_image}']
    Run Keyword If    '${element_exists}' == 'True'  Run Keywords    Set Suite Variable    ${interaction_status}  Pass  AND  Click Element   xpath=//a[text()='${text_image}']
    ...  ELSE   Run Keywords   Set Suite Variable    ${interaction_status}  Fail  AND  Create Error  ${model_name}  ${page_name}  ${element_name}  'image'

    



