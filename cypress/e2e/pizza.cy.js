describe("pizza app", () => {
    beforeEach(()=> {
        cy.visit("http://localhost:3000")
    })

    const orderBtn = () => cy.get(`button[id=order-pizza]`);

    const nameInput = () => cy.get("input[name=nameInput]");
    const sizeInput = () => cy.get("select[name=sizeInput]");

    const pepInput = () => cy.get("input[name=pepperoni]");
    const oniInput = () => cy.get("input[name=onions]");
    const blaInput = () => cy.get("input[name=blackOlives]");
    const pinInput = () => cy.get("input[name=pineapple]");

    const speInput = () => cy.get("input[name=special-text]");

    const addBtn = () => cy.get(`button[id=order-button]`)

    it("sanity test to make sure everything's working", () => {
        expect(1 + 2).to.equal(3)
        expect(2 + 2).not.equal(5);
    })

    it("proper elements are showing", () => {
        orderBtn().should("exist");

        orderBtn().click();

        nameInput().should("exist");
        sizeInput().should("exist");

        pepInput().should("exist");
        oniInput().should("exist");
        blaInput().should("exist");

        pinInput().should("exist");
        speInput().should("exist");
    })

    describe("filling out the inputs and cancelling", () => {
        it("can navigate to the site", () => {
            cy.url().should("include", "localhost");
        })

        it("submit btn starts out disabled", () => {
            orderBtn().click();
            addBtn().should("be.disabled");
        })

        it("can type in the inputs", () => {
            orderBtn().click();
            nameInput()
                .should("have.value", "")
                .type("John Smith")
                .should("have.value", "John Smith");
            speInput()
                .should("have.value", "")
                .type("Please ring the doorbell")
                .should("have.value", "Please ring the doorbell");
        })

        it("the submit button enables when required inputs are filled out", () => {
            orderBtn().click();
            nameInput()
                .should("have.value", "")
                .type("Hello World")
                .should("have.value", "Hello World");
            sizeInput().select("Large");

            addBtn().should("not.be.disabled")
        })

        it("all checkboxes can be selected and deselected", () => {
            orderBtn().click();
            pepInput().check();
            pepInput().uncheck();
            oniInput().check();
            oniInput().uncheck();
            blaInput().check();
            blaInput().uncheck();
            pinInput().check();
            pinInput().uncheck();
        })

        it("add to order button works", () => {

            orderBtn().click();

            nameInput().type("Jordan Brewer");
            sizeInput().select("Large");

            pepInput().check();
            oniInput().check();
            blaInput().check();
            pinInput().check();

            speInput().type("Delivery at the backdoor, ask for Jordan")

            addBtn().click();
            
        })
    })

})