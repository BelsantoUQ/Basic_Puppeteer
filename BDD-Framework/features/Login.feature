Feature: logging in

Scenario: Iniciar sesion en la pagina

Given Im on the right page
When I fill the form with my email: "user@phptravels.com" and my password: "demouser"
Then I should see the dashboard page

@probando
Scenario Outline: Scenario Outline for login

Given Im on the right page
When I fill the form with my <Email> and my <Password>
Then I should see the dashboard page

Examples:
    | Email | Password |
    | user22@phptravelsh.com  | demouser1  |
    | user21@phptravelss.com  | demossuser  |
    | user23@phptravelss.com  | demossuser  |