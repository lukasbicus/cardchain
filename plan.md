https://app.uizard.io/prototypes/VOVVrBm1VBTdBwnrLrGB/player/preview

Features:

1. must have are with bold
2. nice to have are with italics
3. optional are with normal font

- [x] **Welcome page**
  - [x] **add navigation to add cards page**
  - [x] **add navigation to about page**
- [ ] Utils
  - [ ] add theme switching
  - [x] **implement PWA**
  - [x] **add homescreen menu**
  - [x] **create a general search component**
  - [x] **implement primary header**
  - [x] **implement secondary header**
  - [x] **implement sync between local storage and app state**
  - [x] **unit tests**
  - [ ] _fe unit tests_
  - [ ] e2e tests
  - [ ] add notifications after creating/deleting a card
- [ ] **Add cards page**
  - [x] **display list of predefined companies**
  - [ ] display grid of predefined companies + switch to grid
  - [x] _implement search in predefined companies_
  - [x] **implement add card button + navigation to scan code page**
  - [x] _implement click on predefined company + navigation to create card page_
- [x] _Scan code dialog_
  - [x] _implement barcode scan_
  - [x] _implement navigation to qrcode scan + scan itself_
  - [x] open scan dialog on create card page init
  - [ ] add notification/info, when camera permission is denied
- [ ] **Create card page**
  - [x] **implement form**
  - [x] _implement navigation to scan code page_
  - [x] _display scanned code_
  - [ ] implement color picker
  - [x] **implement creation of card (add it to other cards in local storage (); navigate to my cards page)**
- [x] **My cards page**
  - [x] **display list of cards**
  - [ ] display grid of cards
  - [x] **filter collection based on search**
  - [x] filter collection based on favorites
  - [x] _implement (un) mark favorite_
  - [x] **implement navigation to card detail**
- [x] **Card detail page**
  - [x] **display page with bar / qr code**
  - [ ] implement switch note visibility
  - [x] _implement delete card dialog + remove card from local storage_
  - [x] _implement navigation to edit card page_
  - [ ] implement increment of display count
- [x] _Edit card page_
  - [x] _implement edit form_
  - [x] _implement edit card submit (in local storage)_
- [x] **Settings page**
  - [x] **display dummy page**
  - [ ] implement pin favorites on top switch + functionality
  - [ ] implement order cards functionality
  - [ ] implement app language switch functionality
  - [x] implement navigation to export data page
  - [x] implement navigation to import data page
  - [x] _implement navigation to about page_
  - [x] **implement navigation to about author page**
  - [ ] _implement navigation to help page_
  - [ ] implement theme switching
- [x] _Export data page_
  - [ ] export encrypted data
- [x] _Import data page_
  - [ ] import encrypted data
- [x] _About page_
- [x] **About author page**
- [ ] Help page

# bugs

- [x] company icons are not available in offline mode
- [ ] prefer cameras in environment direction
- [x] move app state to the context
