'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const text = `Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов, включая такие аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты. Он помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать процессы за счет применения новейших технологий и увеличивать продажи, используя самые современные аналитические инструменты.

В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с трудностями. Не менее важно уделять внимание обмену знаниями: "Один из самых позитивных моментов — это осознание того, что ты помог клиенту перейти на совершенно новый уровень компетентности, уверенность в том, что после окончания проекта у клиента есть все необходимое, чтобы дальше развиваться самостоятельно".

Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную предпринимательскую деятельность. Он является совладельцем сети клиник эстетической медицины в Швейцарии, предлагающей инновационный подход к красоте, а также инвестором других бизнес-проектов.`;

        const members = [
            { name: 'Артур Королёв', photoNumber: 'photo_1', email: 'artur.korolev@example.com', phoneNumber: '+7-900-123-45-67', description: text, like: false },
            { name: 'Ольга Ильина', photoNumber: 'photo_2', email: 'olga.ilina@example.com', phoneNumber: '+7-900-234-56-78', description: text, like: false },
            { name: 'Замир Орлов', photoNumber: 'photo_3', email: 'zamir.orlov@example.com', phoneNumber: '+7-900-345-67-89', description: text, like: false },
            { name: 'Даниил Новиков', photoNumber: 'photo_4', email: 'daniil.novikov@example.com', phoneNumber: '+7-900-456-78-90', description: text, like: false },
            { name: 'Диана Андреева', photoNumber: 'photo_5', email: 'diana.andreeva@example.com', phoneNumber: '+7-900-567-89-01', description: text, like: false },
            { name: 'Захар Романов', photoNumber: 'photo_6', email: 'zahar.romanov@example.com', phoneNumber: '+7-900-678-90-12', description: text, like: false },
            { name: 'Егор Волков', photoNumber: 'photo_7', email: 'egor.volkov@example.com', phoneNumber: '+7-900-789-01-23', description: text, like: false },
            { name: 'Кира Попова', photoNumber: 'photo_8', email: 'kira.popova@example.com', phoneNumber: '+7-900-890-12-34', description: text, like: false },
            { name: 'Максим Попов', photoNumber: 'photo_2', email: 'maxim.popov@example.com', phoneNumber: '+7-900-901-23-45', description: text, like: false },
            { name: 'Ольга Волкова', photoNumber: 'photo_3', email: 'olga.volkova@example.com', phoneNumber: '+7-900-012-34-56', description: text, like: false },
            { name: 'Андрей Андреев', photoNumber: 'photo_1', email: 'andrey.andreev@example.com', phoneNumber: '+7-900-123-45-67', description: text, like: false },
            { name: 'Светлана Андреева', photoNumber: 'photo_2', email: 'svetlana.andreeva@example.com', phoneNumber: '+7-900-234-56-78', description: text, like: false },
            { name: 'Владимир Новиков', photoNumber: 'photo_3', email: 'vladimir.novikov@example.com', phoneNumber: '+7-900-345-67-89', description: text, like: false },
            { name: 'Татьяна Андреева', photoNumber: 'photo_4', email: 'tatyana.andreeva@example.com', phoneNumber: '+7-900-456-78-90', description: text, like: false },
            { name: 'Юлия Андреева', photoNumber: 'photo_5', email: 'yulia.andreeva@example.com', phoneNumber: '+7-900-567-89-01', description: text, like: false },
            { name: 'Александр Новиков', photoNumber: 'photo_6', email: 'alexander.novikov@example.com', phoneNumber: '+7-900-678-90-12', description: text, like: false },
            { name: 'Елена Орлова', photoNumber: 'photo_7', email: 'elena.orlova@example.com', phoneNumber: '+7-900-789-01-23', description: text, like: false },
            { name: 'Константин Орлов', photoNumber: 'photo_8', email: 'konstantin.orlov@example.com', phoneNumber: '+7-900-890-12-34', description: text, like: false },
            { name: 'Ирина Орлова', photoNumber: 'photo_2', email: 'irina.orlova@example.com', phoneNumber: '+7-900-901-23-45', description: text, like: false },
            { name: 'Виктор Орлов', photoNumber: 'photo_3', email: 'viktor.orlov@example.com', phoneNumber: '+7-900-012-34-56', description: text, like: false },
        ];


        const membersWithTimestamps = members.map(member => ({
            ...member,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert('members', membersWithTimestamps, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('members', null, {});
    }
};
