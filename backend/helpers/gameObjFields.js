const fieldsSet = ['id', 'name', 'year_published', 'min_players', 'max_players', 'min_playtime', 'max_playtime', 'min_age', 'description', 'description_preview', 'thumb_url', 'image_url', 'images', 'primary_publisher', 'mechanics', 'categories', 'designers', 'developers'];

const fields = fieldsSet.join(',');

module.exports = fields;