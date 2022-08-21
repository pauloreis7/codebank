# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: payment.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database

# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from google.protobuf import empty_pb2 as google_dot_protobuf_dot_empty__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(
    b'\n\rpayment.proto\x12\x07payment\x1a\x1bgoogle/protobuf/empty.proto"\xe6\x01\n\x0ePaymentRequest\x12\x36\n\ncreditCard\x18\x01 \x01(\x0b\x32".payment.PaymentRequest.CreditCard\x12\x0e\n\x06\x61mount\x18\x02 \x01(\x01\x12\r\n\x05store\x18\x03 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x04 \x01(\t\x1ah\n\nCreditCard\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\x0e\n\x06number\x18\x02 \x01(\t\x12\x17\n\x0f\x65xpirationMonth\x18\x03 \x01(\x05\x12\x16\n\x0e\x65xpirationYear\x18\x04 \x01(\x05\x12\x0b\n\x03\x63vv\x18\x05 \x01(\x05\x32N\n\x0ePaymentService\x12<\n\x07Payment\x12\x17.payment.PaymentRequest\x1a\x16.google.protobuf.Empty"\x00\x62\x06proto3'
)


_PAYMENTREQUEST = DESCRIPTOR.message_types_by_name["PaymentRequest"]
_PAYMENTREQUEST_CREDITCARD = _PAYMENTREQUEST.nested_types_by_name["CreditCard"]
PaymentRequest = _reflection.GeneratedProtocolMessageType(
    "PaymentRequest",
    (_message.Message,),
    {
        "CreditCard": _reflection.GeneratedProtocolMessageType(
            "CreditCard",
            (_message.Message,),
            {
                "DESCRIPTOR": _PAYMENTREQUEST_CREDITCARD,
                "__module__": "payment_pb2"
                # @@protoc_insertion_point(class_scope:payment.PaymentRequest.CreditCard)
            },
        ),
        "DESCRIPTOR": _PAYMENTREQUEST,
        "__module__": "payment_pb2"
        # @@protoc_insertion_point(class_scope:payment.PaymentRequest)
    },
)
_sym_db.RegisterMessage(PaymentRequest)
_sym_db.RegisterMessage(PaymentRequest.CreditCard)

_PAYMENTSERVICE = DESCRIPTOR.services_by_name["PaymentService"]
if _descriptor._USE_C_DESCRIPTORS == False:

    DESCRIPTOR._options = None
    _PAYMENTREQUEST._serialized_start = 56
    _PAYMENTREQUEST._serialized_end = 286
    _PAYMENTREQUEST_CREDITCARD._serialized_start = 182
    _PAYMENTREQUEST_CREDITCARD._serialized_end = 286
    _PAYMENTSERVICE._serialized_start = 288
    _PAYMENTSERVICE._serialized_end = 366
# @@protoc_insertion_point(module_scope)