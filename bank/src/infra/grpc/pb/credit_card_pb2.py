# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: credit_card.proto
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
    b'\n\x11\x63redit_card.proto\x12\x0b\x63redit_card\x1a\x1bgoogle/protobuf/empty.proto"\'\n\x17\x43reateCreditCardRequest\x12\x0c\n\x04name\x18\x01 \x01(\t2m\n\x17\x43reateCreditCardService\x12R\n\x10\x43reateCreditCard\x12$.credit_card.CreateCreditCardRequest\x1a\x16.google.protobuf.Empty"\x00\x62\x06proto3'
)


_CREATECREDITCARDREQUEST = DESCRIPTOR.message_types_by_name["CreateCreditCardRequest"]
CreateCreditCardRequest = _reflection.GeneratedProtocolMessageType(
    "CreateCreditCardRequest",
    (_message.Message,),
    {
        "DESCRIPTOR": _CREATECREDITCARDREQUEST,
        "__module__": "credit_card_pb2"
        # @@protoc_insertion_point(class_scope:credit_card.CreateCreditCardRequest)
    },
)
_sym_db.RegisterMessage(CreateCreditCardRequest)

_CREATECREDITCARDSERVICE = DESCRIPTOR.services_by_name["CreateCreditCardService"]
if _descriptor._USE_C_DESCRIPTORS == False:

    DESCRIPTOR._options = None
    _CREATECREDITCARDREQUEST._serialized_start = 63
    _CREATECREDITCARDREQUEST._serialized_end = 102
    _CREATECREDITCARDSERVICE._serialized_start = 104
    _CREATECREDITCARDSERVICE._serialized_end = 213
# @@protoc_insertion_point(module_scope)