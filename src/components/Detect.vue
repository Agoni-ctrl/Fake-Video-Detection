<template>
  <div class="detect-page">
    <div class="bg-gray-50 min-h-screen p-6 max-w-7xl mx-auto">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 左侧：上传与检测控制台 -->
        <div class="bg-white rounded-lg shadow-sm p-6 w-full lg:w-[40%] transition-all hover:shadow-lg">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-3 h-3 rounded bg-primary"></div>
            <h2 class="text-lg font-semibold text-gray-800">检测控制台</h2>
          </div>

          <!-- 1. 选择检测类型 -->
          <div class="mb-4">
            <label class="block text-sm text-gray-500 mb-1 font-medium">选择你要检测的对象</label>
            <div class="relative">
              <select 
                v-model="detectType" 
                class="w-full px-3 py-2 border border-light rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary transition-all"
              >
                <option value="image">图片</option>
                <option value="video">视频</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <i class="fa fa-chevron-down text-xs"></i>
              </div>
            </div>
          </div>

          <!-- 2. 拖拽上传区域 -->
          <div 
            class="border-2 border-dashed border-light rounded-lg p-6 text-center mb-4 hover:border-primary transition-colors cursor-pointer group"
            :class="{ 'dropzone-active': isDragOver }"
            id="dropzone"
            @click="triggerFileInput"
            @dragover.prevent="handleDragOver"
            @dragleave="handleDragLeave"
            @drop.prevent="handleDrop"
          >
            <i class="fa fa-cloud-upload text-xl text-gray-400 mb-2 group-hover:text-primary transition-colors"></i>
            <p class="text-sm text-gray-500 mb-1 font-medium">点击或拖拽文件到此处上传</p>
            <p class="text-xs text-gray-400">
              支持 JPG/PNG/MP4 等格式，最大 10MB
            </p>
            <input 
              type="file" 
              class="hidden" 
              id="fileInput" 
              :accept="detectType === 'image' ? 'image/*' : 'video/*'"
              @change="handleFileSelect"
              ref="fileInput"
            >
          </div>

          <!-- 3. 上传预览 -->
          <div 
            class="border border-light rounded-lg p-3 mb-4 hover:shadow-sm transition-all" 
            v-if="uploadedFile"
            id="previewContainer"
          >
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs text-gray-500">已上传文件</span>
              <button 
                class="text-xs text-gray-400 hover:text-danger transition-colors p-1" 
                @click="removePreview"
                id="removePreview"
              >
                <i class="fa fa-times"></i>
              </button>
            </div>
            <div class="flex justify-center" id="previewContent">
              <img 
                v-if="detectType === 'image' && uploadedFile" 
                :src="previewUrl" 
                class="rounded-md max-h-48 object-cover"
                alt="图片预览"
              >
              <video 
                v-else-if="detectType === 'video' && uploadedFile"
                :src="previewUrl" 
                class="rounded-md max-h-48 object-cover"
                controls
              ></video>
            </div>
          </div>

          <!-- 4. 开始检测按钮 -->
          <button 
            class="w-full py-2 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
            :class="[
              uploadedFile ? 'bg-primary hover:bg-primary/90' : 'bg-primary/70',
              isDetecting ? 'bg-gray-400 cursor-wait' : '',
              detectionComplete ? (detectionResult.isReal ? 'bg-success hover:bg-success/90' : 'bg-danger hover:bg-danger/90') : ''
            ]"
            @click="startDetection"
            :disabled="!uploadedFile || isDetecting"
            id="startBtn"
          >
            <i v-if="!isDetecting && !detectionComplete" class="fa fa-play-circle mr-1"></i>
            <i v-if="isDetecting" class="fa fa-spinner fa-spin mr-1"></i>
            <i v-if="detectionComplete" class="fa fa-check-circle mr-1"></i>
            {{ detectionComplete ? '检测完成' : isDetecting ? '检测中...' : '开始检测' }}
          </button>
        </div>

        <!-- 右侧：可视化检测结果仪表盘 -->
        <div class="bg-white rounded-lg shadow-sm p-6 w-full lg:w-[60%] transition-all hover:shadow-lg">
          <div class="flex flex-wrap justify-between items-center mb-6 gap-4">
            <div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded bg-primary"></div>
                <h2 class="text-xl font-bold text-gray-800">检测结果</h2>
              </div>
              <div class="text-xs text-gray-400 mt-1 flex flex-wrap gap-3">
                <span><i class="fa fa-clock-o mr-1 text-primary/70"></i> {{ currentTime }}</span>
                <span><i class="fa fa-file-image-o mr-1 text-primary/70"></i> {{ detectType === 'image' ? '图片检测' : '视频检测' }}</span>
              </div>
            </div>
            <button 
              class="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary/90 transition-all duration-300 text-sm font-medium flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              @click="exportReport"
              :disabled="!detectionComplete"
              id="exportBtn"
            >
              <i class="fa fa-download mr-1"></i> 导出报告
            </button>
          </div>

          <!-- 默认空状态（带填充内容） -->
          <div id="emptyState" v-if="!detectionComplete" class="fade-in">
            <div class="flex flex-col items-center justify-center py-8 text-center mb-8">
              <i class="fa fa-file-image-o text-4xl text-gray-300 mb-4"></i>
              <p class="text-gray-500 mb-2">请上传文件并开始检测</p>
              <p class="text-xs text-gray-400">
                支持图片和视频格式，最大10MB
              </p>
            </div>

            <!-- 空状态填充内容 -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="bg-gray-50 rounded-lg p-4 hover:shadow-sm transition-all">
                <div class="flex items-center gap-2 mb-2">
                  <i class="fa fa-lightbulb-o text-primary"></i>
                  <h4 class="text-sm font-medium text-gray-800">功能特点</h4>
                </div>
                <ul class="text-xs text-gray-600 space-y-1">
                  <li class="flex items-center"><i class="fa fa-check text-success mr-1"></i> 支持图片与视频检测</li>
                  <li class="flex items-center"><i class="fa fa-check text-success mr-1"></i> AI算法精准识别伪造内容</li>
                  <li class="flex items-center"><i class="fa fa-check text-success mr-1"></i> 生成详细检测报告</li>
                  <li class="flex items-center"><i class="fa fa-check text-success mr-1"></i> 支持PDF报告导出</li>
                </ul>
              </div>
              <div class="bg-gray-50 rounded-lg p-4 hover:shadow-sm transition-all">
                <div class="flex items-center gap-2 mb-2">
                  <i class="fa fa-list-ol text-primary"></i>
                  <h4 class="text-sm font-medium text-gray-800">使用步骤</h4>
                </div>
                <ol class="text-xs text-gray-600 space-y-1 list-decimal pl-4">
                  <li>选择检测类型（图片/视频）</li>
                  <li>点击或拖拽上传文件</li>
                  <li>点击「开始检测」按钮</li>
                  <li>查看检测结果并导出报告</li>
                </ol>
              </div>
            </div>

            <div class="bg-gray-50 rounded-lg p-4 hover:shadow-sm transition-all">
              <div class="flex items-center gap-2 mb-2">
                <i class="fa fa-info-circle text-primary"></i>
                <h4 class="text-sm font-medium text-gray-800">系统说明</h4>
              </div>
              <p class="text-xs text-gray-600">
                本系统采用先进的AI检测算法，能够识别图片和视频中的伪造痕迹，包括AI生成、图像篡改等。检测结果仅供参考，如有疑问请通过质疑通道提交反馈。
              </p>
            </div>
          </div>

          <!-- 检测结果区域 -->
          <div 
            id="resultContainer" 
            v-if="detectionComplete" 
            class="fade-in"
            ref="resultContainer"
          >
            <!-- 核心结论区 -->
            <div 
              :class="[
                'rounded-xl p-6 mb-6 transition-all duration-500',
                detectionResult.isReal 
                  ? 'bg-gradient-to-r from-success/10 to-primary/10' 
                  : 'bg-gradient-to-r from-danger/10 to-primary/10'
              ]"
              id="conclusionCard"
            >
              <div class="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                <div>
                  <p class="text-sm text-gray-500 mb-1">最终判定</p>
                  <div class="flex items-center gap-2">
                    <i 
                      :class="[
                        'fa text-2xl',
                        detectionResult.isReal ? 'fa-check-circle text-success' : 'fa-times-circle text-danger'
                      ]"
                      id="conclusionIcon"
                    ></i>
                    <h3 id="conclusionText" class="text-xl font-bold text-gray-800">
                      {{ detectionResult.isReal ? '真实' : '伪造' }}{{ detectType === 'image' ? '图片' : '视频' }}
                    </h3>
                  </div>
                </div>
                <div class="relative w-24 h-24">
                  <svg class="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#E5EAF3" stroke-width="8" />
                    <circle 
                      id="confidenceRing" 
                      cx="50" cy="50" r="45" fill="none" 
                      :stroke="detectionResult.isReal ? '#67C23A' : '#F56C6C'" 
                      stroke-width="8" 
                      stroke-dasharray="283" 
                      :stroke-dashoffset="detectionResult.confidenceRingOffset" 
                      class="progress-ring transition-all duration-1000 ease-in-out" 
                    />
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span id="confidenceValue" class="text-2xl font-bold text-gray-800">
                      {{ detectionResult.confidence }}
                    </span>
                    <span class="text-xs text-gray-500">可信度</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 关键指标卡片 -->
            <div class="grid grid-cols-3 gap-4 mb-6">
              <div class="bg-gray-50 rounded-lg p-4 hover:shadow-sm transition-all border border-gray-100">
                <div class="flex items-center gap-2 mb-2">
                  <i class="fa fa-code text-primary"></i>
                  <span class="text-xs text-gray-500">模型原始得分</span>
                </div>
                <p id="logitsValue" class="text-lg font-semibold text-gray-800">
                  {{ detectionResult.logits }}
                </p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4 hover:shadow-sm transition-all border border-gray-100">
                <div class="flex items-center gap-2 mb-2">
                  <i class="fa fa-check-circle text-success"></i>
                  <span class="text-xs text-gray-500">真实概率</span>
                </div>
                <p id="realProb" class="text-lg font-semibold text-success">
                  {{ detectionResult.realProb }}
                </p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4 hover:shadow-sm transition-all border border-gray-100">
                <div class="flex items-center gap-2 mb-2">
                  <i class="fa fa-exclamation-circle text-danger"></i>
                  <span class="text-xs text-gray-500">伪造概率</span>
                </div>
                <p id="fakeProb" class="text-lg font-semibold text-danger">
                  {{ detectionResult.fakeProb }}
                </p>
              </div>
            </div>

            <!-- 图片信息与分析详情 -->
            <div class="grid grid-cols-2 gap-6">
              <div>
                <h4 class="text-sm font-medium text-gray-800 mb-3 flex items-center gap-1">
                  <i class="fa fa-image text-primary"></i> 
                  {{ detectType === 'image' ? '图片' : '视频' }}信息
                </h4>
                <div class="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-sm transition-all">
                  <div class="text-xs text-gray-500 space-y-1">
                    <p class="flex justify-between"><span class="font-medium">文件名称:</span> <span id="fileName" class="text-gray-600">{{ uploadedFileName || '--' }}</span></p>
                    <p class="flex justify-between"><span class="font-medium">文件大小:</span> <span id="fileSize" class="text-gray-600">{{ uploadedFileSize || '--' }}</span></p>
                    <p class="flex justify-between"><span class="font-medium">文件格式:</span> <span id="fileType" class="text-gray-600">{{ fileFormat || '--' }}</span></p>
                    <p class="flex justify-between"><span class="font-medium">分辨率:</span> <span id="fileResolution" class="text-gray-600">{{ fileResolution || '--' }}</span></p>
                  </div>
                </div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-800 mb-3 flex items-center gap-1">
                  <i class="fa fa-search text-primary"></i> 分析详情
                </h4>
                <div id="analysisDetails" class="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-sm transition-all space-y-2">
                  <div 
                    v-for="(item, index) in detectionResult.analysisDetails" 
                    :key="index" 
                    class="flex items-start gap-2"
                  >
                    <i :class="[item.icon, 'mt-0.5']" :style="{ color: item.color }"></i>
                    <p class="text-xs text-gray-600">{{ item.text }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'DetectPage',
  
  setup() {
    // 响应式数据
    const detectType = ref('image')
    const isDragOver = ref(false)
    const uploadedFile = ref(null)
    const previewUrl = ref('')
    const isDetecting = ref(false)
    const detectionComplete = ref(false)
    const currentTime = ref('')
    const uploadedFileName = ref('')
    const uploadedFileSize = ref('')
    const fileResolution = ref('')
    const fileFormat = ref('') // 新增：文件格式（如PNG/MP4）
    const fileInput = ref(null)
    const resultContainer = ref(null)
    
    // 检测结果数据（对齐HTML的圆环偏移值）
    const detectionResult = ref({
      isReal: true,
      confidence: '99.66%',
      confidenceRingOffset: 1.13,
      logits: '-5.6823',
      realProb: '99.66%',
      fakeProb: '0.34%',
      analysisDetails: []
    })
    
    // 真实图片的分析详情
    const realAnalysisDetails = [
      { icon: 'fa fa-check', color: '#67C23A', text: '像素分布符合自然图片特征，无AI生成痕迹' },
      { icon: 'fa fa-check', color: '#67C23A', text: 'EXIF信息完整，未发现篡改痕迹' },
      { icon: 'fa fa-check', color: '#67C23A', text: '边缘过渡自然，无算法生成的伪影' },
      { icon: 'fa fa-check', color: '#67C23A', text: '光照与阴影逻辑一致，符合真实场景' }
    ]
    
    // 伪造图片的分析详情
    const fakeAnalysisDetails = [
      { icon: 'fa fa-times', color: '#F56C6C', text: '像素分布存在AI生成特征，边缘过渡不自然' },
      { icon: 'fa fa-times', color: '#F56C6C', text: 'EXIF信息存在篡改痕迹，文件元数据异常' },
      { icon: 'fa fa-times', color: '#F56C6C', text: '局部区域发现算法生成的伪影和纹理重复' },
      { icon: 'fa fa-times', color: '#F56C6C', text: '光照与阴影逻辑矛盾，不符合真实物理规律' }
    ]
    
    // 更新时间
    const updateTime = () => {
      const now = new Date()
      currentTime.value = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }
    
    // 触发文件输入
    const triggerFileInput = () => {
      fileInput.value?.click()
    }
    
    // 处理拖拽进入
    const handleDragOver = (e) => {
      e.preventDefault()
      isDragOver.value = true
    }
    
    // 处理拖拽离开
    const handleDragLeave = () => {
      isDragOver.value = false
    }
    
    // 处理文件放置
    const handleDrop = (e) => {
      isDragOver.value = false
      if (e.dataTransfer.files.length > 0) {
        processFile(e.dataTransfer.files[0])
      }
    }
    
    // 处理文件选择
    const handleFileSelect = (e) => {
      if (e.target.files.length > 0) {
        processFile(e.target.files[0])
      }
    }
    
    // 处理文件（对齐HTML的文件信息展示）
    const processFile = (file) => {
      // 重置检测状态
      detectionComplete.value = false
      isDetecting.value = false
      
      // 检查文件大小
      const maxSize = 10 * 1024 * 1024 // 10MB
      if (file.size > maxSize) {
        alert('文件大小不能超过10MB')
        return
      }
      
      // 检查文件类型
      const isImage = file.type.startsWith('image/')
      const isVideo = file.type.startsWith('video/')
      
      if (!isImage && !isVideo) {
        alert('请上传图片或视频文件')
        return
      }
      
      // 更新文件信息（对齐HTML展示）
      uploadedFile.value = file
      uploadedFileName.value = file.name
      uploadedFileSize.value = (file.size / 1024 / 1024).toFixed(2) + ' MB'
      fileFormat.value = file.type.split('/')[1].toUpperCase() // 格式如PNG/MP4
      
      // 创建预览URL
      previewUrl.value = URL.createObjectURL(file)
      
      // 如果是图片，获取分辨率；视频直接显示“视频分辨率”（对齐HTML）
      if (isImage) {
        const img = new Image()
        img.onload = () => {
          fileResolution.value = `${img.width} × ${img.height}`
        }
        img.src = previewUrl.value
      } else {
        fileResolution.value = '视频分辨率'
      }
    }
    
    // 移除预览
    const removePreview = () => {
      if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value)
      }
      
      uploadedFile.value = null
      previewUrl.value = ''
      uploadedFileName.value = ''
      uploadedFileSize.value = ''
      fileResolution.value = ''
      fileFormat.value = ''
      detectionComplete.value = false
      isDetecting.value = false
    }
    
    // 开始检测（对齐HTML的伪造结果圆环偏移值280）
    const startDetection = () => {
      if (!uploadedFile.value) return
      
      isDetecting.value = true
      detectionComplete.value = false
      
      // 模拟检测过程（3秒）
      setTimeout(() => {
        // 随机生成检测结果（50%概率真实，50%概率伪造）
        const isReal = Math.random() > 0.5
        
        if (isReal) {
          // 真实图片结果
          detectionResult.value = {
            isReal: true,
            confidence: '99.66%',
            confidenceRingOffset: 1.13,
            logits: '-5.6823',
            realProb: '99.66%',
            fakeProb: '0.34%',
            analysisDetails: realAnalysisDetails
          }
        } else {
          // 伪造图片结果（圆环偏移值改为280，对齐HTML的显示效果）
          detectionResult.value = {
            isReal: false,
            confidence: '98.21%',
            confidenceRingOffset: 280,
            logits: '6.3217',
            realProb: '1.79%',
            fakeProb: '98.21%',
            analysisDetails: fakeAnalysisDetails
          }
        }
        
        isDetecting.value = false
        detectionComplete.value = true
      }, 3000)
    }
    
    // 导出报告（使用CDN全局变量 window.html2canvas / window.jspdf.jsPDF）
    const exportReport = async () => {
      if (!detectionComplete.value) return
      
      const resultElement = resultContainer.value
      const { jsPDF } = window.jspdf // 从CDN全局变量取jsPDF
      const html2canvas = window.html2canvas // 从CDN全局变量取html2canvas
      
      if (!resultElement) {
        alert('无法生成报告')
        return
      }
      
      try {
        // 生成截图（优化配置，对齐HTML）
        const canvas = await html2canvas(resultElement, { 
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        })
        const imgData = canvas.toDataURL('image/png')
        
        // 创建PDF（对齐HTML的A4尺寸、分页逻辑）
        const doc = new jsPDF('p', 'mm', 'a4')
        const imgWidth = 210
        const pageHeight = 297
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        let heightLeft = imgHeight
        let position = 0

        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight

        if (heightLeft >= 0) {
          position = heightLeft - imgHeight
          doc.addPage()
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        }
        
        // 保存PDF
        doc.save(`检测报告_${new Date().getTime()}.pdf`)
      } catch (error) {
        console.error('导出报告失败:', error)
        alert('导出报告失败，请重试')
      }
    }
    
    // 生命周期钩子
    onMounted(() => {
      updateTime()
      // 每秒更新时间
      const timer = setInterval(updateTime, 1000)
      
      // 清理定时器和预览URL
      onUnmounted(() => {
        clearInterval(timer)
        if (previewUrl.value) {
          URL.revokeObjectURL(previewUrl.value)
        }
      })
    })
    
    return {
      detectType,
      isDragOver,
      uploadedFile,
      previewUrl,
      isDetecting,
      detectionComplete,
      currentTime,
      uploadedFileName,
      uploadedFileSize,
      fileResolution,
      fileFormat,
      fileInput,
      resultContainer,
      detectionResult,
      
      triggerFileInput,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      handleFileSelect,
      removePreview,
      startDetection,
      exportReport
    }
  }
}
</script>

<!-- 组件局部样式（无需重复定义全局变量，tailwind已配好） -->
<style scoped>
.detect-page {
  min-height: 100vh;
}

/* 解决scoped下动画的生效问题 */
:deep(.fade-in) {
  animation: fadeIn 0.5s ease-in-out forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 置信度圆环样式补充 */
:deep(.progress-ring) {
  stroke-linecap: round; /* 圆环端点圆角，更精致 */
}

/* 自定义滚动条（优化体验） */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: var(--light);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(64, 158, 255, 0.3);
}

::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>