import { CashbackCategoryStorage } from '@customTypes/cashback';
import {
    Baby,
    Book,
    Car,
    CarTaxiFront,
    Dog,
    Film,
    Flower,
    Fuel,
    GamepadIcon,
    GraduationCap,
    Home,
    Music,
    Palette,
    PenTool,
    Pill,
    Pizza,
    Plane,
    Scissors,
    Shirt,
    ShoppingBasket,
    ShoppingCart,
    Smartphone,
    Store,
    Train,
    Utensils,
    Video,
} from 'lucide-react-native';

export const CashbackCategories: CashbackCategoryStorage[] = [
    {
        name: 'Авиабилеты',
        code: 'avia',
        icon: Plane,
    },
    {
        name: 'Автоуслуги',
        code: 'auto_service',
        icon: Car,
    },
    {
        name: 'Аптеки',
        code: 'pharmacy',
        icon: Pill,
    },
    {
        name: 'Аренда авто',
        code: 'car_rental',
        icon: Car,
    },
    {
        name: 'Все покупки',
        code: 'all',
        icon: ShoppingCart,
    },
    {
        name: 'Детские товары',
        code: 'kids',
        icon: Baby,
    },
    {
        name: 'Дом и ремонт',
        code: 'home',
        icon: Home,
    },
    {
        name: 'Duty Free',
        code: 'duty_free',
        icon: ShoppingBasket,
    },
    {
        name: 'Ж/д билеты',
        code: 'railway',
        icon: Train,
    },
    {
        name: 'Животные',
        code: 'pets',
        icon: Dog,
    },
    {
        name: 'Искусство',
        code: 'art',
        icon: Palette,
    },
    {
        name: 'Канцтовары',
        code: 'stationery',
        icon: PenTool,
    },
    {
        name: 'Каршеринг',
        code: 'carsharing',
        icon: Car,
    },
    {
        name: 'Кино',
        code: 'cinema',
        icon: Film,
    },
    {
        name: 'Книги',
        code: 'books',
        icon: Book,
    },
    {
        name: 'Красота',
        code: 'beauty',
        icon: Scissors,
    },
    {
        name: 'Маркетплейсы',
        code: 'marketplaces',
        icon: Store,
    },
    {
        name: 'Музыка',
        code: 'music',
        icon: Music,
    },
    {
        name: 'Образование',
        code: 'education',
        icon: GraduationCap,
    },
    {
        name: 'Одежда и обувь',
        code: 'clothes',
        icon: Shirt,
    },
    {
        name: 'Онлайн-кинотеатры',
        code: 'online_cinema',
        icon: Video,
    },
    {
        name: 'Развлечения',
        code: 'entertainment',
        icon: GamepadIcon,
    },
    {
        name: 'Рестораны',
        code: 'restaurants',
        icon: Utensils,
    },
    {
        name: 'Супермаркеты',
        code: 'supermarkets',
        icon: ShoppingCart,
    },
    {
        name: 'Такси',
        code: 'taxi',
        icon: CarTaxiFront,
    },
    {
        name: 'Топливо',
        code: 'fuel',
        icon: Fuel,
    },
    {
        name: 'Транспорт',
        code: 'transport',
        icon: Train,
    },
    {
        name: 'Фастфуд',
        code: 'fastfood',
        icon: Pizza,
    },
    {
        name: 'Цветы',
        code: 'flowers',
        icon: Flower,
    },
    {
        name: 'Электроника',
        code: 'electronics',
        icon: Smartphone,
    },
];
