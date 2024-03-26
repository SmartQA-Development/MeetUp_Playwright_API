export type Store = {
    "store" : {
        "id": number,
        "id_country": string,
        "id_state": string,
        "hours": string,
        "postcode": string,
        "city": string,
        "latitude": string,
        "longitude": string,
        "phone": string,
        "fax": string,
        "email": string,
        "active": string,
        "date_add": string,
        "date_upd": string,
        "name": string,
        "address1": string,
        "address2": string,
        "note": string
    }
}

export type Customer = {
    "customer": {
        "id": number,
        "id_default_group": string,
        "id_lang": string,
        "newsletter_date_add": string,
        "ip_registration_newsletter": string,
        "last_passwd_gen": string,
        "secure_key": string,
        "deleted": string,
        "passwd": string,
        "lastname": string,
        "firstname": string,
        "email": string,
        "id_gender": string,
        "birthday": string,
        "newsletter": string
        "optin": string,
        "website": string,
        "company": string,
        "siret": string,
        "ape": string,
        "outstanding_allow_amount": string,
        "show_public_prices": string,
        "id_risk": string,
        "max_payment_days": string,
        "active": string,
        "note": string,
        "is_guest": string,
        "id_shop": string,
        "id_shop_group": string,
        "date_add": string,
        "date_upd": string,
        "reset_password_token": string,
        "reset_password_validity": string,
        "associations": {
            "groups": [
                {
                    "id": string
                }
            ]
        }
    }
}