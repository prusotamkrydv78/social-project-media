// Middleware to handle EJS layouts
module.exports = function(req, res, next) {
  // Store the original render function
  const originalRender = res.render;

  // Override the render function
  res.render = function(view, options, callback) {
    // Set default options if not provided
    options = options || {};

    // Add the current path to the options
    options.path = req.path;

    // If the view is already the layout, just render it
    if (view === 'layouts/main') {
      return originalRender.call(this, view, options, callback);
    }

    // Render the view first
    originalRender.call(res, view, options, (err, renderedView) => {
      if (err) return callback ? callback(err) : next(err);

      // Then render the layout with the view content
      options.body = renderedView;
      originalRender.call(res, 'layouts/main', options, callback);
    });
  };

  next();
};
