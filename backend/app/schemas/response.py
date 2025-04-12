from pydantic import BaseModel
from typing import TypeVar, Generic, Optional, Literal

# Type variable for the data field
DataType = TypeVar('DataType')

class BaseResponse(BaseModel, Generic[DataType]):
    """
    Base model for API responses.
    """
    status: Literal["success", "error", "fail"] # Use Literal for specific allowed values
    message: Optional[str] = None # Message is optional

class SuccessResponse(BaseResponse[DataType]):
    """
    Standard success response model.
    """
    status: Literal["success"] = "success"
    data: Optional[DataType] = None # Data is optional for success responses

class ErrorResponse(BaseResponse[None]):
    """
    Standard error/fail response model.
    Data is typically null for errors.
    Includes an optional error code.
    """
    status: Literal["error", "fail"] # Can be error or fail
    code: Optional[str] = None # Optional application-specific error code
    data: None = None # Ensure data is always None for errors 