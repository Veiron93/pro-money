import {
    Baby,
    Book,
    Car,
    CarTaxiFront,
    Dog,
    Film,
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
    Store,
    Train,
    Utensils,
    Video,
} from 'lucide-react-native';
import { ReactElement } from 'react';
import { SvgProps } from 'react-native-svg';

const iconParams = {
    color: 'white',
    size: 20,
};

export interface CashbackCategory {
    code: string;
    name: string;
    icon: ReactElement<SvgProps>;
}

export const CashbackCategories: CashbackCategory[] = [
    {
        name: 'Авиабилеты',
        code: 'avia',
        icon: <Plane {...iconParams} />,
    },
    {
        name: 'Автоуслуги',
        code: 'auto_service',
        icon: <Car {...iconParams} />,
    },
    {
        name: 'Аренда авто',
        code: 'car_rental',
        icon: <Car {...iconParams} />,
    },
    {
        name: 'Аптеки',
        code: 'pharmacy',
        icon: <Pill {...iconParams} />,
    },
    {
        name: 'Детские товары',
        code: 'kids',
        icon: <Baby {...iconParams} />,
    },
    {
        name: 'Дом и ремонт',
        code: 'home',
        icon: <Home {...iconParams} />,
    },
    {
        name: 'Ж/д билеты',
        code: 'railway',
        icon: <Train {...iconParams} />,
    },
    {
        name: 'Животные',
        code: 'pets',
        icon: <Dog {...iconParams} />,
    },
    {
        name: 'Искусство',
        code: 'art',
        icon: <Palette {...iconParams} />,
    },
    {
        name: 'Канцтовары',
        code: 'stationery',
        icon: <PenTool {...iconParams} />,
    },
    {
        name: 'Каршеринг',
        code: 'carsharing',
        icon: <Car {...iconParams} />,
    },
    {
        name: 'Кино',
        code: 'cinema',
        icon: <Film {...iconParams} />,
    },
    {
        name: 'Книги',
        code: 'books',
        icon: <Book {...iconParams} />,
    },
    {
        name: 'Красота',
        code: 'beauty',
        icon: <Scissors {...iconParams} />,
    },
    {
        name: 'Музыка',
        code: 'music',
        icon: <Music {...iconParams} />,
    },
    {
        name: 'Образование',
        code: 'education',
        icon: <GraduationCap {...iconParams} />,
    },
    {
        name: 'Одежда и обувь',
        code: 'clothes',
        icon: <Shirt {...iconParams} />,
    },
    {
        name: 'Развлечения',
        code: 'entertainment',
        icon: <GamepadIcon {...iconParams} />,
    },
    {
        name: 'Рестораны',
        code: 'restaurants',
        icon: <Utensils {...iconParams} />,
    },
    {
        name: 'Супермаркеты',
        code: 'supermarkets',
        icon: <ShoppingCart {...iconParams} />,
    },
    {
        name: 'Такси',
        code: 'taxi',
        icon: <CarTaxiFront {...iconParams} />,
    },
    {
        name: 'Топливо',
        code: 'fuel',
        icon: <Fuel {...iconParams} />,
    },
    {
        name: 'Фастфуд',
        code: 'fastfood',
        icon: <Pizza {...iconParams} />,
    },
    {
        name: 'Duty Free',
        code: 'duty_free',
        icon: <ShoppingBasket {...iconParams} />,
    },
    {
        name: 'Онлайн-кинотеатры',
        code: 'online_cinema',
        icon: <Video {...iconParams} />,
    },
    {
        name: 'Маркетплейсы',
        code: 'marketplaces',
        icon: <Store {...iconParams} />,
    },
];
