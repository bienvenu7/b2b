import { createAction, createReducer } from "@reduxjs/toolkit"

export const addCategory = createAction('ADD_CATEGORY')

const initialState = {
    userTariffPackages: [],
    addCatClick: false,
    productType: {
        "id": "46dda122-4e1f-4724-a08b-9690995de0de",
        "name": "CLOTHING",
        "publicName": "Clothing",
        "product": {
          "id": "string",
          "autoincrement": 0,
          "publicId": "string",
          "answerTime": 0,
          "brand": {
            "id": "46dda122-4e1f-4724-a08b-9690995de0de",
            "name": "Nike",
            "productTypeBrands": [
              "string"
            ]
          },
          "checkStatus": {
            "id": "46dda122-4e1f-4724-a08b-9690995de0de",
            "name": "Real"
          },
          "files": [
            {
              "id": "46dda122-4e1f-4724-a08b-9690995de0de",
              "productId": "string",
              "userId": "string",
              "user": {
                "id": "string",
                "email": "string",
                "password": "string",
                "oldPassword": "string",
                "firstName": "string",
                "lastName": "string",
                "companyName": "string",
                "companyRole": "string",
                "monthlyAuthentications": 0,
                "role": {
                  "id": "46dda122-4e1f-4724-a08b-9690995de0de",
                  "name": "Admin"
                },
                "status": {
                  "id": "46dda122-4e1f-4724-a08b-9690995de0de",
                  "name": "Active"
                },
                "refreshToken": "string",
                "hash": "string",
                "createdAt": "2022-07-07T08:54:10.601Z",
                "invoiceIdWithSavedPayment": "string",
                "invoice": {
                  "id": "string",
                  "userId": "string",
                  "user": "string",
                  "promocode": {
                    "id": "string",
                    "promocode": "string",
                    "sum": 0,
                    "description": "string",
                    "isUsed": true,
                    "createdAt": "2022-07-07T08:54:10.601Z"
                  },
                  "amount": 0,
                  "isPaid": true,
                  "paymentSystem": "string",
                  "paymentSystemUserId": "string",
                  "paymentSystemInvoiceId": "string",
                  "paymentSystemInvoiceLink": "string",
                  "paymentMethodId": "string",
                  "cardBrand": "string",
                  "cardExpiresMonth": 0,
                  "cardExpiresYear": 0,
                  "cardLastNumbers": "string",
                  "createdAt": "2022-07-07T08:54:10.601Z",
                  "updatedAt": "2022-07-07T08:54:10.601Z"
                },
                "updatedAt": "2022-07-07T08:54:10.601Z",
                "deletedAt": "2022-07-07T08:54:10.601Z"
              },
              "path": "string",
              "name": "string",
              "extension": "string",
              "feature": "string",
              "angle": "string"
            }
          ],
          "hashPhoto": "string",
          "name": "string",
          "orderId": "string",
          "productReasons": [
            {
              "id": "string",
              "product": "string",
              "reason": {
                "id": "string",
                "name": "string",
                "productReasons": [
                  "string"
                ]
              }
            }
          ],
          "productType": "string",
          "resultStatus": {
            "id": "46dda122-4e1f-4724-a08b-9690995de0de",
            "name": "Open"
          },
          "supplier": "string",
          "certificateNeeded": true,
          "userTariffPackage": {
            "id": "string",
            "userId": "string",
            "user": {
              "id": "string",
              "email": "string",
              "password": "string",
              "oldPassword": "string",
              "firstName": "string",
              "lastName": "string",
              "companyName": "string",
              "companyRole": "string",
              "monthlyAuthentications": 0,
              "role": {
                "id": "46dda122-4e1f-4724-a08b-9690995de0de",
                "name": "Admin"
              },
              "status": {
                "id": "46dda122-4e1f-4724-a08b-9690995de0de",
                "name": "Active"
              },
              "refreshToken": "string",
              "hash": "string",
              "createdAt": "2022-07-07T08:54:10.601Z",
              "invoiceIdWithSavedPayment": "string",
              "invoice": {
                "id": "string",
                "userId": "string",
                "user": "string",
                "promocode": {
                  "id": "string",
                  "promocode": "string",
                  "sum": 0,
                  "description": "string",
                  "isUsed": true,
                  "createdAt": "2022-07-07T08:54:10.601Z"
                },
                "amount": 0,
                "isPaid": true,
                "paymentSystem": "string",
                "paymentSystemUserId": "string",
                "paymentSystemInvoiceId": "string",
                "paymentSystemInvoiceLink": "string",
                "paymentMethodId": "string",
                "cardBrand": "string",
                "cardExpiresMonth": 0,
                "cardExpiresYear": 0,
                "cardLastNumbers": "string",
                "createdAt": "2022-07-07T08:54:10.601Z",
                "updatedAt": "2022-07-07T08:54:10.601Z"
              },
              "updatedAt": "2022-07-07T08:54:10.601Z",
              "deletedAt": "2022-07-07T08:54:10.601Z"
            },
            "productType": "string",
            "volume": 0,
            "answerTime": 0,
            "invoiceId": "string",
            "invoice": {
              "id": "string",
              "userId": "string",
              "user": "string",
              "promocode": {
                "id": "string",
                "promocode": "string",
                "sum": 0,
                "description": "string",
                "isUsed": true,
                "createdAt": "2022-07-07T08:54:10.601Z"
              },
              "amount": 0,
              "isPaid": true,
              "paymentSystem": "string",
              "paymentSystemUserId": "string",
              "paymentSystemInvoiceId": "string",
              "paymentSystemInvoiceLink": "string",
              "paymentMethodId": "string",
              "cardBrand": "string",
              "cardExpiresMonth": 0,
              "cardExpiresYear": 0,
              "cardLastNumbers": "string",
              "createdAt": "2022-07-07T08:54:10.601Z",
              "updatedAt": "2022-07-07T08:54:10.601Z"
            },
            "productId": "string",
            "product": "string",
            "isGift": true,
            "createdAt": "2022-07-07T08:54:10.601Z"
          },
          "userCertificatePackage": {
            "id": "string",
            "userId": "string",
            "user": {
              "id": "string",
              "email": "string",
              "password": "string",
              "oldPassword": "string",
              "firstName": "string",
              "lastName": "string",
              "companyName": "string",
              "companyRole": "string",
              "monthlyAuthentications": 0,
              "role": {
                "id": "46dda122-4e1f-4724-a08b-9690995de0de",
                "name": "Admin"
              },
              "status": {
                "id": "46dda122-4e1f-4724-a08b-9690995de0de",
                "name": "Active"
              },
              "refreshToken": "string",
              "hash": "string",
              "createdAt": "2022-07-07T08:54:10.601Z",
              "invoiceIdWithSavedPayment": "string",
              "invoice": {
                "id": "string",
                "userId": "string",
                "user": "string",
                "promocode": {
                  "id": "string",
                  "promocode": "string",
                  "sum": 0,
                  "description": "string",
                  "isUsed": true,
                  "createdAt": "2022-07-07T08:54:10.602Z"
                },
                "amount": 0,
                "isPaid": true,
                "paymentSystem": "string",
                "paymentSystemUserId": "string",
                "paymentSystemInvoiceId": "string",
                "paymentSystemInvoiceLink": "string",
                "paymentMethodId": "string",
                "cardBrand": "string",
                "cardExpiresMonth": 0,
                "cardExpiresYear": 0,
                "cardLastNumbers": "string",
                "createdAt": "2022-07-07T08:54:10.602Z",
                "updatedAt": "2022-07-07T08:54:10.602Z"
              },
              "updatedAt": "2022-07-07T08:54:10.602Z",
              "deletedAt": "2022-07-07T08:54:10.602Z"
            },
            "volume": 0,
            "invoiceId": "string",
            "invoice": {
              "id": "string",
              "userId": "string",
              "user": "string",
              "promocode": {
                "id": "string",
                "promocode": "string",
                "sum": 0,
                "description": "string",
                "isUsed": true,
                "createdAt": "2022-07-07T08:54:10.602Z"
              },
              "amount": 0,
              "isPaid": true,
              "paymentSystem": "string",
              "paymentSystemUserId": "string",
              "paymentSystemInvoiceId": "string",
              "paymentSystemInvoiceLink": "string",
              "paymentMethodId": "string",
              "cardBrand": "string",
              "cardExpiresMonth": 0,
              "cardExpiresYear": 0,
              "cardLastNumbers": "string",
              "createdAt": "2022-07-07T08:54:10.602Z",
              "updatedAt": "2022-07-07T08:54:10.602Z"
            },
            "productId": "string",
            "product": "string",
            "isGift": true,
            "createdAt": "2022-07-07T08:54:10.602Z"
          },
          "createdAt": "2022-07-07T08:54:10.602Z",
          "updatedAt": "2022-07-07T08:54:10.602Z",
          "deletedAt": "2022-07-07T08:54:10.602Z"
        },
        "productTypeAngles": [
          {
            "id": "string",
            "productType": "string",
            "angle": {
              "id": "46dda122-4e1f-4724-a08b-9690995de0de",
              "name": "full_face",
              "productTypeAngles": [
                "string"
              ]
            }
          }
        ],
        "productTypeBrands": [
          {
            "id": "string",
            "productType": "string",
            "brand": {
              "id": "46dda122-4e1f-4724-a08b-9690995de0de",
              "name": "Nike",
              "productTypeBrands": [
                "string"
              ]
            }
          }
        ]
    }
}



const paymentReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('ADD_CATEGORY', (state = initialState, action) => {
            if (action.payload != null) {
                state.userTariffPackages.push(action.payload)
            }
        })
})

export default paymentReducer