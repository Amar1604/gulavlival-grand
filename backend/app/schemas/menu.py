from typing import List, Optional
from pydantic import BaseModel


class VariantResponse(BaseModel):
    id: str
    name: str
    price: float
    is_available: bool

    class Config:
        from_attributes = True


class MenuItemResponse(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    category_id: Optional[str] = None
    category_name: str
    base_price: float
    image: Optional[str] = None
    rating: float
    popular: bool
    veg: bool
    calories: Optional[int] = None
    is_available: bool
    variants: List[VariantResponse] = []

    class Config:
        from_attributes = True


class CategoryResponse(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    sort_order: int

    class Config:
        from_attributes = True
