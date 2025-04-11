// Custom desk structure for Sanity Studio
export default (S) =>
  S.list()
    .title('Content')
    .items([
      // Content Creation Section
      S.listItem()
        .title('Content Creation')
        .child(
          S.list()
            .title('Content Creation')
            .items([
              S.listItem()
                .title('Articles')
                .child(
                  S.documentTypeList('post')
                    .title('Articles')
                    .filter('_type == "post"')
                ),
              S.listItem()
                .title('Videos')
                .child(
                  S.documentTypeList('videoPost')
                    .title('Videos')
                    .filter('_type == "videoPost"')
                ),
            ])
        ),

      // Content Status Section
      S.listItem()
        .title('Content by Status')
        .child(
          S.list()
            .title('Content by Status')
            .items([
              S.listItem()
                .title('Draft Articles')
                .child(
                  S.documentList()
                    .title('Draft Articles')
                    .filter('_type == "post" && status == "draft"')
                ),
              S.listItem()
                .title('In Review')
                .child(
                  S.documentList()
                    .title('In Review')
                    .filter('_type == "post" && status == "review"')
                ),
              S.listItem()
                .title('Published')
                .child(
                  S.documentList()
                    .title('Published')
                    .filter('_type == "post" && status == "published"')
                ),
              S.listItem()
                .title('Archived')
                .child(
                  S.documentList()
                    .title('Archived')
                    .filter('_type == "post" && status == "archived"')
                ),
            ])
        ),

      // Content by Category
      S.listItem()
        .title('Content by Category')
        .child(
          S.documentTypeList('category')
            .title('Categories')
            .child((categoryId) =>
              S.documentList()
                .title('Articles')
                .filter('_type == "post" && $categoryId in categories[]._ref')
                .params({ categoryId })
            )
        ),

      // News
      S.listItem()
        .title('News')
        .child(
          S.documentList()
            .title('News')
            .filter('_type == "post" && isBreakingNews == true')
        ),

      // SEO Optimization Guide
      S.listItem()
        .title('SEO Guide')
        .child(
          S.editor()
            .id('seoGuide')
            .schemaType('post')
            .documentId('seoGuide')
            .title('SEO Optimization Guide')
        ),

      // Divider
      S.divider(),

      // Taxonomy Management
      S.listItem()
        .title('Taxonomy')
        .child(
          S.list()
            .title('Taxonomy')
            .items([
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('tag').title('Tags'),
              S.documentTypeListItem('author').title('Authors'),
            ])
        ),

      // Settings
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.documentTypeListItem('breakingNews').title('News'),
            ])
        ),
    ]);
