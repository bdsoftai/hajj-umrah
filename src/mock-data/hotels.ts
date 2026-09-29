export interface Hotel {
    id: string;
    name: string;
    city: 'Makkah' | 'Madinah';
    locationName: string;
    distanceMeters: number;
    rating: number;
    basePricePerNight: number;
    imageUrl: string;   // primary image field
    latitude: number;
    longitude: number;
}

export const MOCK_HOTELS: Hotel[] = [
    {
        id: 'm1',
        name: 'Pullman Zamzam Makkah',
        city: 'Makkah',
        locationName: 'Abraj Al Bait (Clock Tower)',
        distanceMeters: 50,
        rating: 5,
        basePricePerNight: 12000,
        imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800',
        latitude: 21.4187,
        longitude: 39.8257,
    },
    {
        id: 'm2',
        name: 'Swissôtel Makkah',
        city: 'Makkah',
        locationName: 'Ajyad Street',
        distanceMeters: 100,
        rating: 5,
        basePricePerNight: 11000,
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        latitude: 21.4161,
        longitude: 39.8250,
    },
    {
        id: 'm3',
        name: 'Anjum Hotel Makkah',
        city: 'Makkah',
        locationName: 'Umm Al Qura Road',
        distanceMeters: 450,
        rating: 4,
        basePricePerNight: 7500,
        imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
        latitude: 21.4115,
        longitude: 39.8236,
    },
    {
        id: 'm4',
        name: 'Al Kiswah Towers',
        city: 'Makkah',
        locationName: 'At Taysir',
        distanceMeters: 1200,
        rating: 3,
        basePricePerNight: 3500,
        imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
        latitude: 21.3980,
        longitude: 39.8320,
    },
    {
        id: 'd1',
        name: 'Dar Al Taqwa Madinah',
        city: 'Madinah',
        locationName: 'Northern Central Area',
        distanceMeters: 30,
        rating: 5,
        basePricePerNight: 10500,
        imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
        latitude: 24.4686,
        longitude: 39.6142,
    },
    {
        id: 'd2',
        name: 'Ansar Palace Hotel',
        city: 'Madinah',
        locationName: 'Southern Central Area',
        distanceMeters: 600,
        rating: 3,
        basePricePerNight: 4000,
        imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
        latitude: 24.4620,
        longitude: 39.6120,
    },
];