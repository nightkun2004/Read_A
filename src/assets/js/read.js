const articleDiv = document.getElementById('article');
const urlslug = articleDiv.getAttribute('data-urlslug'); 
const loadingDiv = document.getElementById('loading');
const contentDiv = document.getElementById('content');

async function fetchArticle() {
    try {
        const response = await fetch(`https://ani-night.online/api/v2/read/${urlslug}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'ไม่พบข้อมูล');
        }

        const custtomImagethumbnail = getImageUrl(data.post.thumbnail)

        // แสดงเนื้อหาบทความ
        document.getElementById('article-title').innerText = data.post.title;
        document.getElementById('article-date').innerText = `วันที่: ${new Date(data.post.createdAt).toLocaleDateString('en-EN')}`; // ปรับวันที่
        document.getElementById('article-image').src = custtomImagethumbnail || 'https://via.placeholder.com/800x400';
        document.getElementById('article-image').alt = data.post.title;
        document.getElementById('article-content').innerHTML = data.post.content; // แสดงเนื้อหาบทความ

        // แสดงบทความที่เกี่ยวข้อง
        const relatedArticles = data.recentUpdates.map(article => `<li><a href="/read/${article.urlslug}" class="text-blue-600 hover:underline">${article.title}</a></li>`).join('');
        document.getElementById('related-articles').innerHTML = relatedArticles;

        document.title = data.post.title; // ตั้งชื่อหน้า
        document.querySelector('meta[name="description"]').setAttribute('content', data.post.description || ''); // ตั้งคำบรรยาย
        document.querySelector('meta[property="og:title"]').setAttribute('content', data.post.title);

        document.querySelector('meta[property="og:description"]').setAttribute('content', data.post.description || '');
        document.querySelector('meta[property="og:image"]').setAttribute('content', getImageUrl(data.post.thumbnail) || '');

        document.getElementById('creator-name').innerText = data.post.creator.username;
        document.getElementById('creator-bio').innerText = data.post.creator.bio || "ไม่มีข้อมูลประวัติโดยย่อ";
        document.getElementById('profile-editor').src = getImageUrlProfile(data.post.creator.profilePicture) || "https://via.placeholder.com/50x50";

        // ปรับข้อมูลบทความ
        document.getElementById('article-content').innerHTML = data.post.content;

        contentDiv.classList.remove('hidden'); // แสดงเนื้อหาบทความ
    } catch (error) {
        console.error(error);
        loadingDiv.innerHTML = `<div class="text-red-500">${error.message}</div>`;
    } finally {
        loadingDiv.classList.add('hidden'); // ซ่อน skeleton
    }
}

fetchArticle();

function getImageUrl(image) {
    if (typeof image === 'string' && (image.startsWith('http') || image.startsWith('https'))) {
        return image;
    } else {
        return `https://ani-night.online/uploads/thumbnails/${image || 'https://via.placeholder.com/800x400'}`;
    }
}

function getImageUrlProfile(image) {
    if (typeof image === 'string' && (image.startsWith('http') || image.startsWith('https'))) {
        return image;
    } else {
        return `https://ani-night.online/uploads/profiles/${image || 'https://via.placeholder.com/800x400'}`;
    }
}